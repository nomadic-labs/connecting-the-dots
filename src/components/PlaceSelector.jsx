import React, { Component } from "react";
import axios from "axios";
import { compact } from "lodash";
import AsyncSelect from "react-select/lib/Async";

const ALGOLIA_ENDPOINT = "https://places-dsn.algolia.net/1/places";

class PlaceSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleChange = s => this._handleChange(s);
    this.searchPlaces = (query, callback) =>
      this._searchPlaces(query, callback);
    this.fetchPlaceById = (id) => this._fetchPlaceById(id);
    this.generateOption = place => this._generateOption(place);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value && prevProps.value !== this.props.value) {
      this.setState({ value: this.generateOptionFromSavedSubmission() })
    }
  }

  _handleChange(selected) {
    if (!selected) {
      return this.setState({ value: selected });
    }

    let placeData = {
      label: selected.label,
      province: selected.value.administrative
        ? selected.value.administrative[0]
        : null,
      latitude: selected.value._geoloc ? selected.value._geoloc.lat : null,
      longitude: selected.value._geoloc ? selected.value._geoloc.lng : null,
      place_id: selected.value.objectID ? selected.value.objectID : null
    };

    if (this.props.placeType === "city") {
      const city = selected.value.locale_names
        ? selected.value.locale_names.default[0]
        : selected.value;
      placeData["city"] = city;
    }

    if (this.props.placeType === "address") {
      const address = selected.value.locale_names
        ? selected.value.locale_names.default[0]
        : selected.value;
      const city = selected.value.city ? selected.value.city.default[0] : null;
      placeData["address"] = address;
      placeData["city"] = city;
    }

    this.props.handleSelect(placeData);
    this.setState({ value: selected });
  }

  _searchPlaces(query, callback) {
    const url = `${ALGOLIA_ENDPOINT}/query/`;
    const data = {
      type: this.props.placeType,
      hitsPerPage: "10",
      query: query
    };
    const method = "post";

    return axios({
      data,
      url,
      method
    })
      .then(res => {
        let options = res.data.hits.map(place => {
          return this.generateOption(place);
        });
        callback(options);
      })
      .catch(err => {
        console.log(err);
      });
  }

  _fetchPlaceById(id) {
    const url = `${ALGOLIA_ENDPOINT}/${id}`;

    axios
      .get(url)
      .then(res => {
        const value = this.generateOption(res.data);
        this.setState({ value });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _generateOption(place) {
    switch (this.props.placeType) {
      case "city":
        return {
          label: `${place.locale_names.default[0]}, ${
            place.administrative[0]
          }, ${place.country.default}`,
          value: place
        };
      case "address":
        const labelPieces = [
          place.locale_names.default[0],
          place.city ? place.city.default[0] : null,
          place.administrative[0],
          place.country.default
        ];

        return {
          label: compact(labelPieces).join(", "),
          value: place
        };
      default:
        return {
          label: `${place.locale_names.default[0]}`,
          value: place
        };
    }
  }

  generateOptionFromSavedSubmission = () => {
    switch (this.props.placeType) {
      case "city":
        return {
          label: this.props.value.label,
          value: this.props.value
        };
      case "address":
        return {
          label: this.props.value.label,
          value: this.props.value
        };
      default:
        return {
          label: this.props.value.label,
          value: this.props.value
        };
    }
  }

  render() {
    const {
      placeType,
      classes,
      name,
      errorMessage,
      handleSelect,
      ...rest
    } = this.props;
    const { value } = this.state;
    return (
      <div {...rest}>
        <AsyncSelect
          name={name}
          className={`city-select ${classes}`}
          value={value}
          onChange={this.handleChange}
          noResultsText="No results for this city"
          placeholder={`Start typing the ${placeType}...`}
          defaultOptions
          loadOptions={this.searchPlaces}
          styles={{
            input: base => ({
              ...base,
              fontFamily: `'Judson', 'Georgia', serif`,
              verticalAlign: "middle"
            }),
            control: (base, state) => {
              const baseStyle = {
                ...base,
                backgroundColor: "#fff",
                border: "2px solid rgba(0,0,0,.1)",
                borderRadius: "none",
                padding: "10px 14px",
                boxShadow: "none"
              };

              if (state.isFocused) {
                return {
                  ...baseStyle,
                  border: "2px solid rgba(0,0,0,.5)",
                  "&:hover": {
                    border: "2px solid rgba(0,0,0,.5)"
                  }
                };
              }

              return baseStyle;
            }
          }}
        />
        {errorMessage && (
          <div className="error-message minicaps">{errorMessage}</div>
        )}
      </div>
    );
  }
}

export default PlaceSelector;

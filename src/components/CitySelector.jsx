import React, { Component } from "react";
import axios from "axios";
import AsyncSelect from "react-select/lib/Async";

const ALGOLIA_ENDPOINT = "https://places-dsn.algolia.net/1/places";

class CitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleChange = s => this._handleChange(s);
    this.searchPlaces = (query, callback) =>
      this._searchPlaces(query, callback);
    this.fetchPlaceById = () => this._fetchPlaceById();
    this.generateCityOption = place => this._generateCityOption(place);
  }

  _handleChange(selected) {
    let cityData = {};

    if (selected) {
      cityData = {
        label: selected.label,
        city: selected.value.locale_names
          ? selected.value.locale_names.default[0]
          : selected.value,
        province: selected.value.administrative
          ? selected.value.administrative[0]
          : null,
        latitude: selected.value._geoloc ? selected.value._geoloc.lat : null,
        longitude: selected.value._geoloc ? selected.value._geoloc.lng : null,
        place_id: selected.value.objectID ? selected.value.objectID : null
      };
    }

    this.props.handleSelect(cityData);
    this.setState({ value: selected });
  }

  _searchPlaces(query, callback) {
    const url = `${ALGOLIA_ENDPOINT}/query/`;
    const data = {
      type: "city",
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
        let options = res.data.hits.map(place =>
          this.generateCityOption(place)
        );
        callback(options);
      })
      .catch(err => {
        console.log(err);
      });
  }

  _fetchPlaceById() {
    const url = `${ALGOLIA_ENDPOINT}/${this.props.place_id}`;

    axios
      .get(url)
      .then(res => {
        const value = this.generateCityOption(res.data);
        this.setState({ value });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _generateCityOption(place) {
    return {
      label: `${place.locale_names.default[0]}, ${place.administrative[0]}, ${
        place.country.default
      }`,
      value: place
    };
  }

  render() {
    return (
      <div {...this.props}>
        <AsyncSelect
          name={this.props.name}
          className={`city-select ${this.props.classes}`}
          value={this.state.value}
          onChange={this.handleChange}
          noResultsText="No results for this city"
          placeholder="Start typing a city name..."
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
        {this.props.errorMessage && (
          <div className="error-message minicaps">
            {this.props.errorMessage}
          </div>
        )}
      </div>
    );
  }
}

export default CitySelector;

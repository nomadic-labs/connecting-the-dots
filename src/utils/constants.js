export const emptyContentItems = {
  paragraph: { 'type': 'paragraph', 'text': 'Paragraph placeholder text' },
  header: { 'type': 'header', 'text': 'Header placeholder text' },
  file: { 'type': 'file', 'filepath': '', 'title': 'Placeholder title', 'filetype': 'pdf'},
  image: { 'type': 'image', 'imageSrc': '', 'caption': 'Placeholder title'},
  section: { 'type': 'section', content: [] },
  button: { 'type': 'button', 'link': '/', 'anchor': 'Placeholder' },
  action: { 'type': 'action', 'link': '/', 'anchor': 'Placeholder' },
  feature_box: { 'type': 'feature_box', 'header': 'Header', 'description': 'Description' },
  phase: { 'type': 'phase', 'header': 'Header', 'description': 'Description' },
  popup_square: { 'type': 'popup_square', 'header': 'Header', 'description': 'Description' },
  statistic: { 'type': 'statistic', 'number': '42', 'label': 'Label placeholder'},
  contact_section: {
    'type': 'contact_section',
    'address': '123 Example St, Kampala, Uganda',
    'phone': '+1 234 556 8910',
    'email': 'info@communauts.org',
    'phone_label': 'Call us today!',
    'email_label': 'General enquiries'
  },
};

export const DEPLOY_ENDPOINT = 'https://toolkit.sharonkennedy.ca';

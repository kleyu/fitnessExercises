import React, { Component } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@material-ui/core';

export default class extends Component {
  state = this.getInitState();

  getInitState() {
    const { exercise } = this.props;

    return exercise
      ? exercise
      : {
          title: '',
          description: '',
          muscles: ''
        };
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.title.toLowerCase().replace(/ /g, '-'),
      ...this.state
    });
  };

  render() {
    const { title, description, muscles } = this.state,
      { exercise, muscles: categories } = this.props;
    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth
        />
        <br />
        <FormControl fullWidth>
          <InputLabel htmlFor="muscles">Muscles</InputLabel>
          <Select value={muscles} onChange={this.handleChange('muscles')}>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          label="Description"
          value={description}
          multiline
          rows="4"
          onChange={this.handleChange('description')}
          margin="normal"
          fullWidth
        />
        <br />
        <Button
          color="primary"
          variant="raised"
          onClick={this.handleSubmit}
          disabled={!title || !muscles}
        >
          {exercise ? 'Edit' : 'Create'}
        </Button>
      </form>
    );
  }
}

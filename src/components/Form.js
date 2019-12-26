import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          id: 1,
          text: 'Default Text One'
        },
        {
          id: 2,
          text: 'Longer Default Text One'
        },
        {
          id: 3,
          text: 'Very very long Default Text One'
        }
      ],
      inputValue: '',
      filteredOptions: [],
      selectedOptions: [],
      displayDropdown: false
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ filteredOptions: this.state.options });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // reference to form node
  setFormRef = node => {
    this.formRef = node;
  };

  // close dropdown
  handleClickOutside = event => {
    if (this.formRef && !this.formRef.contains(event.target)) {
      this.setState({ displayDropdown: false });
      this.inputRef.current.blur();
    }
  };

  // open dropdown
  openOptionsHandler = event => {
    this.setState({ displayDropdown: true });
    this.inputRef.current.focus();
  };

  onSubmitHandler = event => {
    event.preventDefault();
  };

  onChangeHandler = event => {
    // function returns if empty value is passed to input
    if (event.target.value === ' ' || event.target.value == null) {
      return;
    }

    let options = this.state.options;
    if (
      Array.isArray(this.state.selectedOptions) &&
      this.state.selectedOptions.length
    ) {
      options = options.filter(option => {
        return this.state.selectedOptions.indexOf(option) === -1;
      });
    }

    let updatedFilteredOptions = options.filter(option => {
      return option.text
        .trim()
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setState({
      inputValue: event.target.value,
      filteredOptions: updatedFilteredOptions
    });
  };

  checkBtnHandler = () => {
    if (
      Array.isArray(this.state.filteredOptions) &&
      this.state.filteredOptions.length
    ) {
      let updatedSelectedOptions = this.state.selectedOptions;
      let selectedOption = this.state.filteredOptions.slice(0, 1);
      updatedSelectedOptions.push(selectedOption[0]);

      const updatedFilteredOptions = this.state.options.filter(option => {
        return this.state.selectedOptions.indexOf(option) === -1;
      });
      this.inputRef.current.focus();
      this.setState({
        inputValue: '',
        filteredOptions: updatedFilteredOptions,
        selectedOptions: updatedSelectedOptions
      });
    }
  };

  optionClickHandler = id => {
    let updatedSelectedOptions = this.state.selectedOptions;
    const updatedSelectedOption = this.state.filteredOptions.filter(option => {
      return id === option.id;
    });
    updatedSelectedOptions.push(updatedSelectedOption[0]);
    const updatedFilteredOptions = this.state.options.filter(option => {
      return this.state.selectedOptions.indexOf(option) === -1;
    });
    this.inputRef.current.focus();
    this.setState({
      inputValue: '',
      filteredOptions: updatedFilteredOptions,
      selectedOptions: updatedSelectedOptions
    });
  };

  removeSelectedOptionHandler = id => {
    const updatedSelectedOptions = this.state.selectedOptions.filter(option => {
      return id !== option.id;
    });
    const updatedFilteredOptions = this.state.options.filter(option => {
      return updatedSelectedOptions.indexOf(option) === -1;
    });

    this.inputRef.current.focus();
    this.setState({
      inputValue: '',
      filteredOptions: updatedFilteredOptions,
      selectedOptions: updatedSelectedOptions
    });
  };

  clearInputValueHandler = () => {
    const updatedFilteredOptions = this.state.options.filter(option => {
      return this.state.selectedOptions.indexOf(option) === -1;
    });

    this.inputRef.current.focus();
    this.setState({ inputValue: '', filteredOptions: updatedFilteredOptions });
  };

  render() {
    let selectedOptions = null;
    let filteredOptions = null;

    if (
      Array.isArray(this.state.selectedOptions) &&
      this.state.selectedOptions.length
    ) {
      selectedOptions = (
        <div
          className={[
            this.props.classes.inputOptions,
            'is-shown',
            'is-selected'
          ].join(' ')}
        >
          {this.state.selectedOptions.map(option => {
            return (
              <Button variant='outlined' color='primary' key={option.id}>
                {option.text} &nbsp;
                <HighlightOffIcon
                  className={this.props.classes.iconBtn}
                  onClick={() => this.removeSelectedOptionHandler(option.id)}
                />
              </Button>
            );
          })}
        </div>
      );
    }

    if (
      Array.isArray(this.state.filteredOptions) &&
      this.state.filteredOptions.length
    ) {
      filteredOptions = (
        <div
          className={
            this.state.displayDropdown
              ? [this.props.classes.inputOptions, 'is-shown'].join(' ')
              : this.props.classes.inputOptions
          }
        >
          {this.state.filteredOptions.map(option => {
            return (
              <Button
                variant='contained'
                color='primary'
                key={option.id}
                onClick={() => this.optionClickHandler(option.id)}
              >
                {option.text}
              </Button>
            );
          })}
        </div>
      );
    }

    return (
      <Container maxWidth='sm'>
        <form
          className={this.props.classes.form}
          onSubmit={this.submitHandler}
          autoComplete='off'
          ref={this.setFormRef}
        >
          <div className={this.props.classes.inputWrapper}>
            {selectedOptions}
            <Input
              id='input'
              className={this.props.classes.input}
              variant='outlined'
              value={this.state.inputValue}
              inputRef={this.inputRef}
              onChange={this.onChangeHandler}
              onFocus={this.openOptionsHandler}
              endAdornment={
                this.state.displayDropdown ? (
                  <>
                    {Array.isArray(this.state.filteredOptions) &&
                    this.state.filteredOptions.length &&
                    this.state.inputValue.length > 0 ? (
                      <CheckCircleRoundedIcon
                        className={this.props.classes.iconBtn}
                        onClick={this.checkBtnHandler}
                      />
                    ) : null}{' '}
                    |{' '}
                    <HighlightOffIcon
                      className={this.props.classes.iconBtn}
                      onClick={this.clearInputValueHandler}
                    />
                  </>
                ) : (
                  <>
                    |{' '}
                    <ExpandMoreIcon
                      className={this.props.classes.iconBtn}
                      onClick={this.openOptionsHandler}
                    />
                  </>
                )
              }
            />
          </div>
          {filteredOptions}
        </form>
      </Container>
    );
  }
}

const useStyles = theme => ({
  form: {
    margin: '50px 0'
  },
  inputWrapper: {
    border: '1px solid #ccc'
  },
  input: {
    width: '100%',
    padding: '10px',
    background: 'white',

    '&:before, &:after': {
      content: 'none'
    }
  },
  inputOptions: {
    display: 'none',
    padding: '10px',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    background: 'rgba(0,0,0, 0.1)',

    '&.is-selected': {
      background: '#fff'
    },

    '&.is-shown': {
      display: 'flex'
    },

    '& > *': {
      margin: '7px'
    }
  },
  iconBtn: {
    cursor: 'pointer'
  }
});

export default withStyles(useStyles)(form);

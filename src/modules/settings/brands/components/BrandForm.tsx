import gql from 'graphql-tag';
import ButtonMutate from 'modules/common/components/ButtonMutate';
import * as React from 'react';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup
} from '../../../common/components';
import { ModalFooter } from '../../../common/styles/main';
import { mutations, queries } from '../graphql';
import { IBrand } from '../types';

type Props = {
  brand?: IBrand;
  save: (
    params: {
      doc: {
        name: string;
        description: string;
      };
    },
    callback: () => void,
    brand?: IBrand
  ) => void;
  closeModal: () => void;
};

class BrandForm extends React.Component<Props, { isSubmitted: boolean }> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSubmitted: false
    };
  }

  save = e => {
    e.preventDefault();

    const { save, brand, closeModal } = this.props;
    save(this.generateDoc(), () => closeModal(), brand);
  };

  generateDoc = () => {
    return {
      doc: {
        name: (document.getElementById('brand-name') as HTMLInputElement).value,
        description: (document.getElementById(
          'brand-description'
        ) as HTMLInputElement).value
      }
    };
  };

  generateDocs = () => {
    return {
      name: (document.getElementById('brand-name') as HTMLInputElement).value,
      description: (document.getElementById(
        'brand-description'
      ) as HTMLInputElement).value
    };
  };

  submitForm = e => {
    e.preventDefault();

    this.setState({ isSubmitted: true });
  };

  renderContent() {
    const object = this.props.brand || ({} as IBrand);

    return (
      <div>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>

          <FormControl
            id="brand-name"
            defaultValue={object.name}
            type="text"
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>

          <FormControl
            id="brand-description"
            componentClass="textarea"
            rows={5}
            defaultValue={object.description}
          />
        </FormGroup>
      </div>
    );
  }

  commonOptions = () => {
    return {
      refetchQueries: [
        {
          query: gql(queries.brands)
        }
      ]
    };
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        {this.renderContent()}
        <ModalFooter>
          <Button
            btnStyle="simple"
            type="button"
            icon="cancel-1"
            onClick={this.props.closeModal}
          >
            Cancel
          </Button>

          <Button btnStyle="success" icon="checked-1" type="submit">
            Save
          </Button>

          <ButtonMutate
            mutation={mutations.brandAdd}
            getVariables={this.generateDocs}
            callback={this.props.closeModal}
            refetchQueries={this.commonOptions()}
            isSubmitted={this.state.isSubmitted}
          >
            Save
          </ButtonMutate>
        </ModalFooter>
      </form>
    );
  }
}

export default BrandForm;

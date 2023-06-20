import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

const CreateCabinForm = ({ cabinToEdit = {} }) => {
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = cabinToEdit;
    // Converts the id to a boolean, no id === false, id exists === true
    const isEditSession = Boolean(editId);

    // The register function is used to register the inputs
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        // Default values ONLY for edit session, the empty object is for when we are creating a new cabin
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    // Gets the submitted form data
    const onSubmit = data => {
        // Keeps the database path as a string or uses the value of the file input
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];

        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    // We have access here also to onSuccess so the reset feature still works
                    // It has access to data
                    // When editing the reset feature would NOT be visible since we are adding default values to the inputs
                    onSuccess: data => {
                        reset();
                    },
                }
            );
        } else {
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: data => {
                        reset();
                    },
                }
            );
        }
    };

    const onError = errors => {
        console.log(errors);
    };

    return (
        // Call the handleSubmit passing our own submit handler and our own error handler
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        // Custom validation logic
                        validate: value => {
                            const { regularPrice } = getValues();
                            return (
                                Number(value) <= Number(regularPrice) ||
                                'Discount should be less than regular price'
                            );
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession
                            ? false
                            : 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? 'Edit cabin' : 'Create new cabin'}
                </Button>
            </FormRow>
        </Form>
    );
};

export default CreateCabinForm;

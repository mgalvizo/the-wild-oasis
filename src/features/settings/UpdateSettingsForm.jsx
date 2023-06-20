import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

const UpdateSettingsForm = () => {
    const {
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
        isLoading,
    } = useSettings();
    const { updateSetting, isUpdating } = useUpdateSetting();

    if (isLoading) {
        return <Spinner />;
    }

    // The update will be applied onBlur
    const handleBlur = (e, field) => {
        const { value } = e.target; // Value from the event

        if (!value) {
            return;
        }
        // Computes whatever the field value reprensents
        updateSetting({ [field]: value });
    };

    // This time we are using UNCONTROLLED fields, so we will NOT store state
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    defaultValue={minBookingLength}
                    onBlur={e => handleBlur(e, 'minBookingLength')}
                    disabled={isUpdating}
                    id="min-nights"
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    defaultValue={maxBookingLength}
                    onBlur={e => handleBlur(e, 'maxBookingLength')}
                    disabled={isUpdating}
                    id="max-nights"
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={e => handleBlur(e, 'maxGuestsPerBooking')}
                    disabled={isUpdating}
                    id="max-guests"
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    defaultValue={breakfastPrice}
                    onBlur={e => handleBlur(e, 'breakfastPrice')}
                    disabled={isUpdating}
                    id="breakfast-price"
                />
            </FormRow>
        </Form>
    );
};

export default UpdateSettingsForm;

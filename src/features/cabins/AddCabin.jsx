import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

const AddCabin = () => {
    // "opens" and "name" have to match for the Modal to work properly
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
};

export default AddCabin;

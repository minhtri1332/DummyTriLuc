
class MachineIdClass {
    private machineId: string = "";

    getMachineId = () => {
        return this.machineId;
    };

    change = async (newMachineId: string) => {
        this.machineId = newMachineId;
    };
}

const MachineIdService = new MachineIdClass();
export default MachineIdService;

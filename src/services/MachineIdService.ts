class MachineIdClass {
  private machineId: string = "nodeesp32";

  getMachineId = () => {
    return this.machineId;
  };

  change = async (newMachineId: string) => {
    if (newMachineId != "") {
      this.machineId = newMachineId;
    }
  };
}

const MachineIdService = new MachineIdClass();
export default MachineIdService;

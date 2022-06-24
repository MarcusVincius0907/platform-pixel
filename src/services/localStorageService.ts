enum StorageKeys{
  COMPLETE_REGISTRATION = 'COMPLETE_REGISTRATION',
}

const StorageService = {

  setCompleteRegistration: (value: boolean) =>{
    localStorage.setItem(StorageKeys.COMPLETE_REGISTRATION, JSON.stringify(value));
  },
  
  getCompleteRegistration: () =>{
    const value = localStorage.getItem(StorageKeys.COMPLETE_REGISTRATION);
    return JSON.parse(value? value : 'null');
  }

}

export default Storage;
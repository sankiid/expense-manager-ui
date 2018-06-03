import { IAlert } from "./alert.modal";

export class AlertService{
  
    public alerts: Array<IAlert> = [];
    
    setAlert(_id:number, _type:string, _message:string){
        this.alerts.push({
            id: _id,
            type:  _type,
            message: _message
        });
    }

    getAlerts(){
        return this.alerts;
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
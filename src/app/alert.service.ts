import { IAlert } from "./alert.modal";

export class AlertService{
  
    public alerts: Array<IAlert> = [];

    setAlert(alert:IAlert){
        this.alerts.push(alert);
    }
    
    getAlerts(){
        return this.alerts;
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
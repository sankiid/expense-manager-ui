declare var google: any;

export class GoogleChartsBaseService {

  constructor() { 
    google.charts.load('current', {'packages':['corechart']});
  }

  protected buildChart(data: any[], chartFunc: any, options: any) : void {
    google.charts.setOnLoadCallback(() => {
      var datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
    });
  }
  
}
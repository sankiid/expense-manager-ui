import { Component, Input, OnInit } from "@angular/core";
import { PieChartConfig } from "../modal/pie-chart.config";
import { GooglePieChartService } from "../google-pie-chart.service";


declare var google: any;

@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html'
})
export class PieChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() elementId: String;

    constructor(private _pieChartService: GooglePieChartService) {}

    ngOnInit(): void {
        setTimeout(() => {
            this._pieChartService.BuildPieChart(this.elementId, this.data, this.config); 
        }, 1000);
    }
}
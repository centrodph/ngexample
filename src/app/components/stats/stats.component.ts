import { Component, OnInit } from "@angular/core";
import { StatsService } from "../../services/stats.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"]
})
export class StatsComponent implements OnInit {
  constructor(private statsService: StatsService) {}
  stats = null;
  error = null;
  loading = false;
  userPerStatus = null;
  operationsPerDay = null;
  barChartLegend = false;
  ngOnInit() {
    this.statsService.stats.subscribe(stats => {
      if (stats) {
        this.stats = stats;
        this.userPerStatus = {
          data: stats.userPerStatus.map(i => i.count),
          label: stats.userPerStatus.map(i => i.status)
        };
        this.operationsPerDay = {
          data: stats.operationsPerDay.map(i => i.count),
          label: stats.operationsPerDay.map(i => i.date)
        };
      }
    });
    this.statsService.error.subscribe(error => (this.error = error));
    this.statsService.loading.subscribe(loading => (this.loading = loading));
    this.statsService.getStats();
  }
}

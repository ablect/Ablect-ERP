import type {
  ChartDataPoint,
} from "./ChartDataPoint";

export interface ChartSeries {

  id: string;

  label: string;

  data: ChartDataPoint[];

}
import {Point} from "./point";

export interface ChartModel {
  data: Point[],
  label: string,
  backgroundColor: string | undefined,
  color: string | undefined
}

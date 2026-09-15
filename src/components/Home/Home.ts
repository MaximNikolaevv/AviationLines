export type Plane = [
  string,
  string,
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type PlanesInfo = {
  states: Plane[];
}

export type PlanePanelProps = {

plane: Plane | null;
onClose: () => void;

}
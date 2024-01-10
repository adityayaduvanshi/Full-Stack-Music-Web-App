import { Prediction } from "replicate"

const defaultPrediction: Prediction = {
  error: 'Array queries not supported yet', 
  id: '-1', 
  version: '-1', 
  input: {},
  status: "starting",
  model: "",
  source: "api",
  created_at: "",
  urls: {
    get: "",
    cancel: "",
    stream: undefined
  }
}

export {
  defaultPrediction,
}
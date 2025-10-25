import { Tool } from "./Tool";
import DummyToolA from "./tools/DummyToolA";
import DummyToolB from "./tools/DummyToolB";

export const toolRegistry: Tool[] = [
  {
    id: "dummyA",
    name: "Dummy Tool A",
    icon: "🅰️",
    description: "This is the first dummy tool.",
    Component: DummyToolA,
  },
  {
    id: "dummyB",
    name: "Dummy Tool B",
    icon: "🅱️",
    description: "This is the second dummy tool.",
    Component: DummyToolB,
  },
];

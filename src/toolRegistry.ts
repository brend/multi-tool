import { Tool } from "./Tool";
import DummyToolA from "./tools/DummyToolA";
import DummyToolB from "./tools/DummyToolB";
import XmlValidator from "./tools/XmlValidator";

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
  {
    id: "xmlValidator",
    name: "XML Validator",
    icon: "📄",
    description: "Validate XML documents.",
    Component: XmlValidator,
  },
];

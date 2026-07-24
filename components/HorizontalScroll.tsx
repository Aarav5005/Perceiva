import Panel1Sees from "./Panel1Sees";
import Panel2Understands from "./Panel2Understands";
import Panel3Remembers from "./Panel3Remembers";

export default function HorizontalScroll() {
  return (
    <section className="w-full flex flex-col">
      <Panel1Sees />
      <Panel2Understands />
      <Panel3Remembers />
    </section>
  );
}

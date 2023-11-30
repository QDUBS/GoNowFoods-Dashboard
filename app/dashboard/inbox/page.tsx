import Layout from "../../../src/components/dashboard/Layout";
import InboxMessage from "../../../src/components/dashboard/Message";

const Page = () => {
  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Inbox</p>
        </div>

        <div className="p-8">
          <InboxMessage
            time={"6 days ago"}
            title={"Payment declined"}
            message={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipissci rerum dignissimos eligendi iure, quo eos culpa voluptas eveniet nihil perferendis mollitia quia expedita magniat quis dolores! Temporibus, necessitatibus mollitia."
            }
            recent={true}
          />
          <InboxMessage
            time={"1 week ago"}
            title={"Payment declined"}
            message={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipissci rerum dignissimos eligendi iure, quo eos culpa voluptas eveniet nihil perferendis mollitia quia expedita magniat quis dolores! Temporibus, necessitatibus mollitia."
            }
            recent={true}
          />
          <InboxMessage
            time={"July 10 2023"}
            title={"Payment declined"}
            message={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipissci rerum dignissimos eligendi iure, quo eos culpa voluptas eveniet nihil perferendis mollitia quia expedita magniat quis dolores! Temporibus, necessitatibus mollitia."
            }
            recent={false}
          />
          <InboxMessage
            time={"May 5 2023"}
            title={"Payment declined"}
            message={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipissci rerum dignissimos eligendi iure, quo eos culpa voluptas eveniet nihil perferendis mollitia quia expedita magniat quis dolores! Temporibus, necessitatibus mollitia."
            }
            recent={true}
          />
        </div>
      </section>
    </>
  );
};

const Inbox = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Inbox;

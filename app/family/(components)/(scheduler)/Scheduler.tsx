import React from "react";
import { Epg, Layout } from "planby";

// Import hooks
import { useApp } from "./useApp";

// Import components
import { Timeline } from "./Timeline";
import { ChannelItem } from "./ChannelItem";
import { Program } from "./ProgramItem";

export function Scheduler() {
  const { isLoading, getEpgProps, getLayoutProps } = useApp();

  return (
    <div>
      <div style={{ height: "80vh", width: "100%" }}>
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderTimeline={(props) => <Timeline {...props} />}
            renderProgram={({ program, ...rest }) => (
              <Program key={program.data.id} program={program} {...rest} />
            )}
            renderChannel={({ channel }) => (
              <ChannelItem key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </div>
    </div>
  );
}

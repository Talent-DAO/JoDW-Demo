import type { ApolloCache } from "@apollo/client";
import { useBroadcastMutation } from "@jodw/lens";
import onError from "../lib/shared/onError";

interface Props {
  onCompleted?: (data: any) => void;
  update?: (cache: ApolloCache<any>) => void;
}

const useBroadcast = ({ onCompleted, update }: Props): { broadcast: any; data: any; loading: boolean } => {
  const [broadcast, { data, loading }] = useBroadcastMutation({
    onCompleted,
    update,
    onError: (error) => {
      if (error.message === "A previous transaction may not been mined yet or you have passed in a invalid nonce. You must wait for that to be mined before doing another action, please try again in a few moments. Nonce out of sync.") {
        onError(error);
      }
    }
  });

  return {
    broadcast: ({ request }: any) => broadcast({ variables: { request } }),
    data,
    loading
  };
};

export default useBroadcast;
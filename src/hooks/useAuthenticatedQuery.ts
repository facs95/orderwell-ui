import { useCookies } from "react-cookie";
import {
    QueryKey,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from "react-query";
import { queryFunction } from "../utils/helpers";

export function useAuthenticatedQuery<TData = unknown>(
    queryKey: QueryKey,
    url: string,
    options?: UseQueryOptions<any, unknown, any, QueryKey> | undefined
): UseQueryResult<TData, any> {
    const [cookies] = useCookies(["token"]);
    return useQuery<TData>(queryKey, () => queryFunction(url, cookies.token), options);
}

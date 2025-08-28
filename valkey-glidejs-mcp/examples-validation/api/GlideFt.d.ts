/**
 * Copyright Valkey GLIDE Project Contributors - SPDX Identifier: Apache-2.0
 */
import { DecoderOption, GlideRecord, GlideReturnType, GlideString } from "../BaseClient";
import { GlideClient } from "../GlideClient";
import { GlideClusterClient } from "../GlideClusterClient";
import { Field, FtAggregateOptions, FtCreateOptions, FtSearchOptions } from "./GlideFtOptions";
/** Response type of {@link GlideFt.info | ft.info} command. */
export type FtInfoReturnType = Record<string, GlideString | number | GlideString[] | Record<string, GlideString | Record<string, GlideString | number>[]>>;
/**
 * Response type for the {@link GlideFt.search | ft.search} command.
 */
export type FtSearchReturnType = [
    number,
    GlideRecord<GlideRecord<GlideString>>
];
/**
 * Response type for the {@link GlideFt.aggregate | ft.aggregate} command.
 */
export type FtAggregateReturnType = GlideRecord<GlideReturnType>[];
/** Module for Vector Search commands. */
export declare class GlideFt {
    /**
     * Creates an index and initiates a backfill of that index.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name for the index to be created.
     * @param schema - The fields of the index schema, specifying the fields and their types.
     * @param options - (Optional) Options for the `FT.CREATE` command. See {@link FtCreateOptions}.
     * @returns If the index is successfully created, returns "OK".
     *
     * @example
     * ```typescript
     * // Example usage of FT.CREATE to create a 6-dimensional JSON index using the HNSW algorithm
     * await GlideFt.create(client, "json_idx1", [{
     *      type: "VECTOR",
     *      name: "$.vec",
     *      alias: "VEC",
     *      attributes: {
     *          algorithm: "HNSW",
     *          type: "FLOAT32",
     *          dimension: 6,
     *          distanceMetric: "L2",
     *          numberOfEdges: 32,
     *      },
     *  }], {
     *      dataType: "JSON",
     *      prefixes: ["json:"]
     *  });
     * ```
     */
    static create(client: GlideClient | GlideClusterClient, indexName: GlideString, schema: Field[], options?: FtCreateOptions): Promise<"OK">;
    /**
     * Deletes an index and associated content. Indexed document keys are unaffected.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @returns "OK"
     *
     * @example
     * ```typescript
     * // Example usage of FT.DROPINDEX to drop an index
     * await GlideFt.dropindex(client, "json_idx1"); // "OK"
     * ```
     */
    static dropindex(client: GlideClient | GlideClusterClient, indexName: GlideString): Promise<"OK">;
    /**
     * Lists all indexes.
     *
     * @param client - The client to execute the command.
     * @param options - (Optional) See {@link DecoderOption}.
     * @returns An array of index names.
     *
     * @example
     * ```typescript
     * console.log(await GlideFt.list(client)); // Output: ["index1", "index2"]
     * ```
     */
    static list(client: GlideClient | GlideClusterClient, options?: DecoderOption): Promise<GlideString[]>;
    /**
     * Runs a search query on an index, and perform aggregate transformations on the results.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @param query - The text query to search.
     * @param options - Additional parameters for the command - see {@link FtAggregateOptions} and {@link DecoderOption}.
     * @returns Results of the last stage of the pipeline.
     *
     * @example
     * ```typescript
     * const options: FtAggregateOptions = {
     *      loadFields: ["__key"],
     *      clauses: [
     *          {
     *              type: "GROUPBY",
     *              properties: ["@condition"],
     *              reducers: [
     *                  {
     *                      function: "TOLIST",
     *                      args: ["__key"],
     *                      name: "bicycles",
     *                  },
     *              ],
     *          },
     *      ],
     *  };
     * const result = await GlideFt.aggregate(client, "myIndex", "*", options);
     * console.log(result); // Output:
     * // [
     * //     [
     * //         {
     * //             key: "condition",
     * //             value: "refurbished"
     * //         },
     * //         {
     * //             key: "bicycles",
     * //             value: [ "bicycle:9" ]
     * //         }
     * //     ],
     * //     [
     * //         {
     * //             key: "condition",
     * //             value: "used"
     * //         },
     * //         {
     * //             key: "bicycles",
     * //             value: [ "bicycle:1", "bicycle:2", "bicycle:3" ]
     * //         }
     * //     ],
     * //     [
     * //         {
     * //             key: "condition",
     * //             value: "new"
     * //         },
     * //         {
     * //             key: "bicycles",
     * //             value: [ "bicycle:0", "bicycle:5" ]
     * //         }
     * //     ]
     * // ]
     * ```
     */
    static aggregate(client: GlideClient | GlideClusterClient, indexName: GlideString, query: GlideString, options?: DecoderOption & FtAggregateOptions): Promise<FtAggregateReturnType>;
    /**
     * Returns information about a given index.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @param options - (Optional) See {@link DecoderOption}.
     * @returns Nested maps with info about the index. See example for more details.
     *
     * @example
     * ```typescript
     * const info = await GlideFt.info(client, "myIndex");
     * console.log(info); // Output:
     * // {
     * //     index_name: 'myIndex',
     * //     index_status: 'AVAILABLE',
     * //     key_type: 'JSON',
     * //     creation_timestamp: 1728348101728771,
     * //     key_prefixes: [ 'json:' ],
     * //     num_indexed_vectors: 0,
     * //     space_usage: 653471,
     * //     num_docs: 0,
     * //     vector_space_usage: 653471,
     * //     index_degradation_percentage: 0,
     * //     fulltext_space_usage: 0,
     * //     current_lag: 0,
     * //     fields: [
     * //         {
     * //             identifier: '$.vec',
     * //             type: 'VECTOR',
     * //             field_name: 'VEC',
     * //             option: '',
     * //             vector_params: {
     * //                 data_type: 'FLOAT32',
     * //                 initial_capacity: 1000,
     * //                 current_capacity: 1000,
     * //                 distance_metric: 'L2',
     * //                 dimension: 6,
     * //                 block_size: 1024,
     * //                 algorithm: 'FLAT'
     * //             }
     * //         },
     * //         {
     * //             identifier: 'name',
     * //             type: 'TEXT',
     * //             field_name: 'name',
     * //             option: ''
     * //         },
     * //     ]
     * // }
     * ```
     */
    static info(client: GlideClient | GlideClusterClient, indexName: GlideString, options?: DecoderOption): Promise<FtInfoReturnType>;
    /**
     * Parse a query and return information about how that query was parsed.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @param query - The text query to search. It is the same as the query passed as
     * an argument to {@link search | FT.SEARCH} or {@link aggregate | FT.AGGREGATE}.
     * @param options - (Optional) See {@link DecoderOption}.
     * @returns A query execution plan.
     *
     * @example
     * ```typescript
     * const result = GlideFt.explain(client, "myIndex", "@price:[0 10]");
     * console.log(result); // Output: "Field {\n\tprice\n\t0\n\t10\n}"
     * ```
     */
    static explain(client: GlideClient | GlideClusterClient, indexName: GlideString, query: GlideString, options?: DecoderOption): Promise<GlideString>;
    /**
     * Parse a query and return information about how that query was parsed.
     * Same as {@link explain | FT.EXPLAIN}, except that the results are
     * displayed in a different format.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @param query - The text query to search. It is the same as the query passed as
     * an argument to {@link search | FT.SEARCH} or {@link aggregate | FT.AGGREGATE}.
     * @param options - (Optional) See {@link DecoderOption}.
     * @returns A query execution plan.
     *
     * @example
     * ```typescript
     * const result = GlideFt.explaincli(client, "myIndex", "@price:[0 10]");
     * console.log(result); // Output: ["Field {", "price", "0", "10", "}"]
     * ```
     */
    static explaincli(client: GlideClient | GlideClusterClient, indexName: GlideString, query: GlideString, options?: DecoderOption): Promise<GlideString[]>;
    /**
     * Uses the provided query expression to locate keys within an index. Once located, the count
     * and/or content of indexed fields within those keys can be returned.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name to search into.
     * @param query - The text query to search.
     * @param options - (Optional) See {@link FtSearchOptions} and {@link DecoderOption}.
     * @returns A two-element array, where the first element is the number of documents in the result set, and the
     * second element has the format: `GlideRecord<GlideRecord<GlideString>>`:
     * a mapping between document names and a map of their attributes.
     *
     * If `count` or `limit` with values `{offset: 0, count: 0}` is
     * set, the command returns array with only one element: the number of documents.
     *
     * @example
     * ```typescript
     * //
     * const vector = Buffer.alloc(24);
     * const result = await GlideFt.search(client, "json_idx1", "*=>[KNN 2 @VEC $query_vec]", {params: [{key: "query_vec", value: vector}]});
     * console.log(result); // Output:
     * // [
     * //   2,
     * //   [
     * //     {
     * //       key: "json:2",
     * //       value: [
     * //         {
     * //           key: "$",
     * //           value: '{"vec":[1.1,1.2,1.3,1.4,1.5,1.6]}',
     * //         },
     * //         {
     * //           key: "__VEC_score",
     * //           value: "11.1100006104",
     * //         },
     * //       ],
     * //     },
     * //     {
     * //       key: "json:0",
     * //       value: [
     * //         {
     * //           key: "$",
     * //           value: '{"vec":[1,2,3,4,5,6]}',
     * //         },
     * //         {
     * //           key: "__VEC_score",
     * //           value: "91",
     * //         },
     * //       ],
     * //     },
     * //   ],
     * // ]
     * ```
     */
    static search(client: GlideClient | GlideClusterClient, indexName: GlideString, query: GlideString, options?: FtSearchOptions & DecoderOption): Promise<FtSearchReturnType>;
    /**
     * Runs a search query and collects performance profiling information.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @param query - The text query to search.
     * @param options - (Optional) See {@link FtSearchOptions} and {@link DecoderOption}. Additionally:
     * - `limited` (Optional) - Either provide a full verbose output or some brief version.
     *
     * @returns A two-element array. The first element contains results of the search query being profiled, the
     *     second element stores profiling information.
     *
     * @example
     * ```typescript
     * // Example of running profile on a search query
     * const vector = Buffer.alloc(24);
     * const result = await GlideFt.profileSearch(client, "json_idx1", "*=>[KNN 2 @VEC $query_vec]", {params: [{key: "query_vec", value: vector}]});
     * console.log(result); // Output:
     * // result[0] contains `FT.SEARCH` response with the given query
     * // result[1] contains profiling data as a `Record<string, number>`
     * ```
     */
    static profileSearch(client: GlideClient | GlideClusterClient, indexName: GlideString, query: GlideString, options?: DecoderOption & FtSearchOptions & {
        limited?: boolean;
    }): Promise<[FtSearchReturnType, Record<string, number>]>;
    /**
     * Runs an aggregate query and collects performance profiling information.
     *
     * @param client - The client to execute the command.
     * @param indexName - The index name.
     * @param query - The text query to search.
     * @param options - (Optional) See {@link FtAggregateOptions} and {@link DecoderOption}. Additionally:
     * - `limited` (Optional) - Either provide a full verbose output or some brief version.
     *
     * @returns A two-element array. The first element contains results of the aggregate query being profiled, the
     *     second element stores profiling information.
     *
     * @example
     * ```typescript
     * // Example of running profile on an aggregate query
     * const options: FtAggregateOptions = {
     *      loadFields: ["__key"],
     *      clauses: [
     *          {
     *              type: "GROUPBY",
     *              properties: ["@condition"],
     *              reducers: [
     *                  {
     *                      function: "TOLIST",
     *                      args: ["__key"],
     *                      name: "bicycles",
     *                  },
     *              ],
     *          },
     *      ],
     *  };
     * const result = await GlideFt.profileAggregate(client, "myIndex", "*", options);
     * console.log(result); // Output:
     * // result[0] contains `FT.AGGREGATE` response with the given query
     * // result[1] contains profiling data as a `Record<string, number>`
     * ```
     */
    static profileAggregate(client: GlideClient | GlideClusterClient, indexName: GlideString, query: GlideString, options?: DecoderOption & FtAggregateOptions & {
        limited?: boolean;
    }): Promise<[FtAggregateReturnType, Record<string, number>]>;
    /**
     * Adds an alias for an index. The new alias name can be used anywhere that an index name is required.
     *
     * @param client - The client to execute the command.
     * @param indexName - The alias to be added to the index.
     * @param alias - The index name for which the alias has to be added.
     * @returns `"OK"`
     *
     * @example
     * ```typescript
     * // Example usage of FT.ALIASADD to add an alias for an index.
     * await GlideFt.aliasadd(client, "index", "alias"); // "OK"
     * ```
     */
    static aliasadd(client: GlideClient | GlideClusterClient, indexName: GlideString, alias: GlideString): Promise<"OK">;
    /**
     * Deletes an existing alias for an index.
     *
     * @param client - The client to execute the command.
     * @param alias -  The existing alias to be deleted for an index.
     * @returns `"OK"`
     *
     * @example
     * ```typescript
     * // Example usage of FT.ALIASDEL to delete an existing alias.
     * await GlideFt.aliasdel(client, "alias"); // "OK"
     * ```
     */
    static aliasdel(client: GlideClient | GlideClusterClient, alias: GlideString): Promise<"OK">;
    /**
     * Updates an existing alias to point to a different physical index. This command only affects future references to the alias.
     *
     * @param client - The client to execute the command.
     * @param alias - The alias name. This alias will now be pointed to a different index.
     * @param indexName - The index name for which an existing alias has to updated.
     * @returns `"OK"`
     *
     * @example
     * ```typescript
     * // Example usage of FT.ALIASUPDATE to update an alias to point to a different index.
     * await GlideFt.aliasupdate(client, "newAlias", "index"); // "OK"
     * ```
     */
    static aliasupdate(client: GlideClient | GlideClusterClient, alias: GlideString, indexName: GlideString): Promise<"OK">;
    /**
     * List the index aliases.
     *
     * @param client - The client to execute the command.
     * @param options - (Optional) See {@link DecoderOption}.
     * @returns A map of index aliases for indices being aliased.
     *
     * @example
     * ```typescript
     * // Example usage of FT._ALIASLIST to query index aliases
     * const result = await GlideFt.aliaslist(client);
     * console.log(result); // Output:
     * //[{"key": "alias1", "value": "index1"}, {"key": "alias2", "value": "index2"}]
     * ```
     */
    static aliaslist(client: GlideClient | GlideClusterClient, options?: DecoderOption): Promise<GlideRecord<GlideString>>;
}

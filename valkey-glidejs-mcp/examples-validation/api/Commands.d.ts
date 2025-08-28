/**
 * Copyright Valkey GLIDE Project Contributors - SPDX Identifier: Apache-2.0
 */
import { GlideRecord, GlideString, HashDataType, Score, ObjectType, SortedSetDataType, ElementAndScore } from "./BaseClient";
import { command_request } from "./ProtobufMessage";
/**
 * @internal
 */
export declare function parseInfoResponse(response: string): Record<string, string>;
/**
 * @internal
 */
export declare function createGet(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createGetDel(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createGetRange(key: GlideString, start: number, end: number): command_request.Command;
export type SetOptions = ({
    /**
     * `onlyIfDoesNotExist` - Only set the key if it does not already exist.
     * `NX` in the Valkey API.
     *
     * `onlyIfExists` - Only set the key if it already exists.
     * `EX` in the Valkey API.
     */
    conditionalSet?: "onlyIfExists" | "onlyIfDoesNotExist";
} | {
    /**
     * `onlyIfEqual` - Only set the key if the comparison value equals the current value of key.
     * `IFEQ` in the Valkey API.
     */
    conditionalSet: "onlyIfEqual";
    /**
     * The value to compare the existing value with.
     */
    comparisonValue: GlideString;
}) & {
    /**
     * Return the old string stored at key, or nil if key did not exist. An error
     * is returned and SET aborted if the value stored at key is not a string.
     * Equivalent to `GET` in the Valkey API.
     */
    returnOldValue?: boolean;
    /**
     * If not set, no expiry time will be set for the value.
     *
     * `keepExisting` - Retain the time to live associated with the key.
     * Equivalent to `KEEPTTL` in the Valkey API.
     */
    expiry?: "keepExisting" | {
        type: TimeUnit;
        count: number;
    };
};
/**
 * @internal
 */
export declare function createSet(key: GlideString, value: GlideString, options?: SetOptions): command_request.Command;
/**
 * INFO option: a specific section of information:
 * When no parameter is provided, the default option is assumed.
 */
export declare enum InfoOptions {
    /**
     * SERVER: General information about the server
     */
    Server = "server",
    /**
     * CLIENTS: Client connections section
     */
    Clients = "clients",
    /**
     * MEMORY: Memory consumption related information
     */
    Memory = "memory",
    /**
     * PERSISTENCE: RDB and AOF related information
     */
    Persistence = "persistence",
    /**
     * STATS: General statistics
     */
    Stats = "stats",
    /**
     * REPLICATION: Master/replica replication information
     */
    Replication = "replication",
    /**
     * CPU: CPU consumption statistics
     */
    Cpu = "cpu",
    /**
     * COMMANDSTATS: Valkey command statistics
     */
    Commandstats = "commandstats",
    /**
     * LATENCYSTATS: Valkey command latency percentile distribution statistics
     */
    Latencystats = "latencystats",
    /**
     * SENTINEL: Valkey Sentinel section (only applicable to Sentinel instances)
     */
    Sentinel = "sentinel",
    /**
     * CLUSTER: Valkey Cluster section
     */
    Cluster = "cluster",
    /**
     * MODULES: Modules section
     */
    Modules = "modules",
    /**
     * KEYSPACE: Database related statistics
     */
    Keyspace = "keyspace",
    /**
     * ERRORSTATS: Valkey error statistics
     */
    Errorstats = "errorstats",
    /**
     * ALL: Return all sections (excluding module generated ones)
     */
    All = "all",
    /**
     * DEFAULT: Return only the default set of sections
     */
    Default = "default",
    /**
     * EVERYTHING: Includes all and modules
     */
    Everything = "everything"
}
/**
 * @internal
 */
export declare function createPing(str?: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createInfo(options?: InfoOptions[]): command_request.Command;
/**
 * @internal
 */
export declare function createDel(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSelect(index: number): command_request.Command;
/**
 * @internal
 */
export declare function createClientGetName(): command_request.Command;
/**
 * @internal
 */
export declare function createConfigRewrite(): command_request.Command;
/**
 * @internal
 */
export declare function createConfigResetStat(): command_request.Command;
/**
 * @internal
 */
export declare function createMGet(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createMSet(keysAndValues: GlideRecord<GlideString>): command_request.Command;
/**
 * @internal
 */
export declare function createMSetNX(keysAndValues: GlideRecord<GlideString>): command_request.Command;
/**
 * @internal
 */
export declare function createIncr(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createIncrBy(key: GlideString, amount: number): command_request.Command;
/**
 * @internal
 */
export declare function createIncrByFloat(key: GlideString, amount: number): command_request.Command;
/**
 * @internal
 */
export declare function createClientId(): command_request.Command;
/**
 * @internal
 */
export declare function createConfigGet(parameters: string[]): command_request.Command;
/**
 * @internal
 */
export declare function createConfigSet(parameters: Record<string, GlideString>): command_request.Command;
/**
 * @internal
 */
export declare function createHGet(key: GlideString, field: GlideString): command_request.Command;
/**
 * This function converts an input from {@link HashDataType} or `Record` types to `HashDataType`.
 *
 * @param fieldsAndValues - field names and their values.
 * @returns HashDataType array containing field names and their values.
 */
export declare function convertFieldsAndValuesToHashDataType(fieldsAndValues: HashDataType | Record<string, GlideString>): HashDataType;
/**
 * @internal
 */
export declare function createHSet(key: GlideString, fieldValueList: HashDataType): command_request.Command;
/**
 * @internal
 */
export declare function createHKeys(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createHSetNX(key: GlideString, field: GlideString, value: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createDecr(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createDecrBy(key: GlideString, amount: number): command_request.Command;
/**
 * Enumeration defining the bitwise operation to use in the {@link BaseClient.bitop|bitop} command. Specifies the
 * bitwise operation to perform between the passed in keys.
 */
export declare enum BitwiseOperation {
    AND = "AND",
    OR = "OR",
    XOR = "XOR",
    NOT = "NOT"
}
/**
 * @internal
 */
export declare function createBitOp(operation: BitwiseOperation, destination: GlideString, keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createGetBit(key: GlideString, offset: number): command_request.Command;
/**
 * @internal
 */
export declare function createSetBit(key: GlideString, offset: number, value: number): command_request.Command;
/**
 * Represents a signed or unsigned argument encoding for the {@link BaseClient.bitfield|bitfield} or
 * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
 */
export interface BitEncoding {
    /**
     * Returns the encoding as a string argument to be used in the {@link BaseClient.bitfield|bitfield} or
     * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
     *
     * @returns The encoding as a string argument.
     */
    toArg(): string;
}
/**
 * Represents a signed argument encoding.
 */
export declare class SignedEncoding implements BitEncoding {
    private static readonly SIGNED_ENCODING_PREFIX;
    private readonly encoding;
    /**
     * Creates an instance of SignedEncoding.
     *
     * @param encodingLength - The bit size of the encoding. Must be less than 65 bits long.
     */
    constructor(encodingLength: number);
    toArg(): string;
}
/**
 * Represents an unsigned argument encoding.
 */
export declare class UnsignedEncoding implements BitEncoding {
    private static readonly UNSIGNED_ENCODING_PREFIX;
    private readonly encoding;
    /**
     * Creates an instance of UnsignedEncoding.
     *
     * @param encodingLength - The bit size of the encoding. Must be less than 64 bits long.
     */
    constructor(encodingLength: number);
    toArg(): string;
}
/**
 * Represents an offset for an array of bits for the {@link BaseClient.bitfield|bitfield} or
 * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
 */
export interface BitFieldOffset {
    /**
     * Returns the offset as a string argument to be used in the {@link BaseClient.bitfield|bitfield} or
     * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
     *
     * @returns The offset as a string argument.
     */
    toArg(): string;
}
/**
 * Represents an offset in an array of bits for the {@link BaseClient.bitfield|bitfield} or
 * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
 *
 * For example, if we have the binary `01101001` with offset of 1 for an unsigned encoding of size 4, then the value
 * is 13 from `0(1101)001`.
 */
export declare class BitOffset implements BitFieldOffset {
    private readonly offset;
    /**
     * Creates an instance of BitOffset.
     *
     * @param offset - The bit index offset in the array of bits. Must be greater than or equal to 0.
     */
    constructor(offset: number);
    toArg(): string;
}
/**
 * Represents an offset in an array of bits for the {@link BaseClient.bitfield|bitfield} or
 * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands. The bit offset index is calculated as the numerical
 * value of the offset multiplied by the encoding value.
 *
 * For example, if we have the binary 01101001 with offset multiplier of 1 for an unsigned encoding of size 4, then the
 * value is 9 from `0110(1001)`.
 */
export declare class BitOffsetMultiplier implements BitFieldOffset {
    private static readonly OFFSET_MULTIPLIER_PREFIX;
    private readonly offset;
    /**
     * Creates an instance of BitOffsetMultiplier.
     *
     * @param offset - The offset in the array of bits, which will be multiplied by the encoding value to get the final
     *      bit index offset.
     */
    constructor(offset: number);
    toArg(): string;
}
/**
 * Represents subcommands for the {@link BaseClient.bitfield|bitfield} or
 * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
 */
export interface BitFieldSubCommands {
    /**
     * Returns the subcommand as a list of string arguments to be used in the {@link BaseClient.bitfield|bitfield} or
     * {@link BaseClient.bitfieldReadOnly|bitfieldReadOnly} commands.
     *
     * @returns The subcommand as a list of string arguments.
     */
    toArgs(): string[];
}
/**
 * Represents the "GET" subcommand for getting a value in the binary representation of the string stored in `key`.
 */
export declare class BitFieldGet implements BitFieldSubCommands {
    private static readonly GET_COMMAND_STRING;
    private readonly encoding;
    private readonly offset;
    /**
     * Creates an instance of BitFieldGet.
     *
     * @param encoding - The bit encoding for the subcommand.
     * @param offset - The offset in the array of bits from which to get the value.
     */
    constructor(encoding: BitEncoding, offset: BitFieldOffset);
    toArgs(): string[];
}
/**
 * Represents the "SET" subcommand for setting bits in the binary representation of the string stored in `key`.
 */
export declare class BitFieldSet implements BitFieldSubCommands {
    private static readonly SET_COMMAND_STRING;
    private readonly encoding;
    private readonly offset;
    private readonly value;
    /**
     * Creates an instance of BitFieldSet
     *
     * @param encoding - The bit encoding for the subcommand.
     * @param offset - The offset in the array of bits where the value will be set.
     * @param value - The value to set the bits in the binary value to.
     */
    constructor(encoding: BitEncoding, offset: BitFieldOffset, value: number);
    toArgs(): string[];
}
/**
 * Represents the "INCRBY" subcommand for increasing or decreasing bits in the binary representation of the string
 * stored in `key`.
 */
export declare class BitFieldIncrBy implements BitFieldSubCommands {
    private static readonly INCRBY_COMMAND_STRING;
    private readonly encoding;
    private readonly offset;
    private readonly increment;
    /**
     * Creates an instance of BitFieldIncrBy
     *
     * @param encoding - The bit encoding for the subcommand.
     * @param offset - The offset in the array of bits where the value will be incremented.
     * @param increment - The value to increment the bits in the binary value by.
     */
    constructor(encoding: BitEncoding, offset: BitFieldOffset, increment: number);
    toArgs(): string[];
}
/**
 * Enumeration specifying bit overflow controls for the {@link BaseClient.bitfield|bitfield} command.
 */
export declare enum BitOverflowControl {
    /**
     * Performs modulo when overflows occur with unsigned encoding. When overflows occur with signed encoding, the value
     * restarts at the most negative value. When underflows occur with signed encoding, the value restarts at the most
     * positive value.
     */
    WRAP = "WRAP",
    /**
     * Underflows remain set to the minimum value, and overflows remain set to the maximum value.
     */
    SAT = "SAT",
    /**
     * Returns `None` when overflows occur.
     */
    FAIL = "FAIL"
}
/**
 * Represents the "OVERFLOW" subcommand that determines the result of the "SET" or "INCRBY"
 * {@link BaseClient.bitfield|bitfield} subcommands when an underflow or overflow occurs.
 */
export declare class BitFieldOverflow implements BitFieldSubCommands {
    private static readonly OVERFLOW_COMMAND_STRING;
    private readonly overflowControl;
    /**
     * Creates an instance of BitFieldOverflow.
     *
     * @param overflowControl - The desired overflow behavior.
     */
    constructor(overflowControl: BitOverflowControl);
    toArgs(): string[];
}
/**
 * @internal
 */
export declare function createBitField(key: GlideString, subcommands: BitFieldSubCommands[], readOnly?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createHDel(key: GlideString, fields: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createHMGet(key: GlideString, fields: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createHExists(key: GlideString, field: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createHGetAll(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createLPush(key: GlideString, elements: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createLPushX(key: GlideString, elements: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createLPop(key: GlideString, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createLRange(key: GlideString, start: number, end: number): command_request.Command;
/**
 * @internal
 */
export declare function createLLen(key: GlideString): command_request.Command;
/**
 * Enumeration representing element popping or adding direction for the List Based Commands.
 */
export declare enum ListDirection {
    /**
     * Represents the option that elements should be popped from or added to the left side of a list.
     */
    LEFT = "LEFT",
    /**
     * Represents the option that elements should be popped from or added to the right side of a list.
     */
    RIGHT = "RIGHT"
}
/**
 * @internal
 */
export declare function createLMove(source: GlideString, destination: GlideString, whereFrom: ListDirection, whereTo: ListDirection): command_request.Command;
/**
 * @internal
 */
export declare function createBLMove(source: GlideString, destination: GlideString, whereFrom: ListDirection, whereTo: ListDirection, timeout: number): command_request.Command;
/**
 * @internal
 */
export declare function createLSet(key: GlideString, index: number, element: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createLTrim(key: GlideString, start: number, end: number): command_request.Command;
/**
 * @internal
 */
export declare function createLRem(key: GlideString, count: number, element: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createRPush(key: GlideString, elements: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createRPushX(key: GlideString, elements: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createRPop(key: GlideString, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createSAdd(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSRem(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSScan(key: GlideString, cursor: GlideString, options?: BaseScanOptions): command_request.Command;
/**
 * @internal
 */
export declare function createSMembers(key: GlideString): command_request.Command;
/**
 *
 * @internal
 */
export declare function createSMove(source: GlideString, destination: GlideString, member: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createSCard(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createSInter(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSInterCard(keys: GlideString[], limit?: number): command_request.Command;
/**
 * @internal
 */
export declare function createSInterStore(destination: GlideString, keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSDiff(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSDiffStore(destination: GlideString, keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSUnion(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSUnionStore(destination: GlideString, keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSIsMember(key: GlideString, member: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createSMIsMember(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createSPop(key: GlideString, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createSRandMember(key: GlideString, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createCustomCommand(args: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createHIncrBy(key: GlideString, field: GlideString, amount: number): command_request.Command;
/**
 * @internal
 */
export declare function createHIncrByFloat(key: GlideString, field: GlideString, amount: number): command_request.Command;
/**
 * @internal
 */
export declare function createHLen(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createHVals(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createExists(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createUnlink(keys: GlideString[]): command_request.Command;
export declare enum ExpireOptions {
    /**
     * `HasNoExpiry` - Sets expiry only when the key has no expiry.
     */
    HasNoExpiry = "NX",
    /**
     * `HasExistingExpiry` - Sets expiry only when the key has an existing expiry.
     */
    HasExistingExpiry = "XX",
    /**
     * `NewExpiryGreaterThanCurrent` - Sets expiry only when the new expiry is
     * greater than current one.
     */
    NewExpiryGreaterThanCurrent = "GT",
    /**
     * `NewExpiryLessThanCurrent` - Sets expiry only when the new expiry is less
     * than current one.
     */
    NewExpiryLessThanCurrent = "LT"
}
/**
 * @internal
 */
export declare function createExpire(key: GlideString, seconds: number, option?: ExpireOptions): command_request.Command;
/**
 * @internal
 */
export declare function createExpireAt(key: GlideString, unixSeconds: number, option?: ExpireOptions): command_request.Command;
/**
 * @internal
 */
export declare function createExpireTime(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createPExpire(key: GlideString, milliseconds: number, option?: ExpireOptions): command_request.Command;
/**
 * @internal
 */
export declare function createPExpireAt(key: GlideString, unixMilliseconds: number, option?: ExpireOptions): command_request.Command;
/**
 * @internal
 */
export declare function createPExpireTime(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createTTL(key: GlideString): command_request.Command;
/**
 * Options for updating elements of a sorted set key.
 */
export declare enum UpdateByScore {
    /** Only update existing elements if the new score is less than the current score. */
    LESS_THAN = "LT",
    /** Only update existing elements if the new score is greater than the current score. */
    GREATER_THAN = "GT"
}
export interface ZAddOptions {
    /**
     * Options for handling existing members.
     */
    conditionalChange?: ConditionalChange;
    /**
     * Options for updating scores.
     */
    updateOptions?: UpdateByScore;
    /**
     * Modify the return value from the number of new elements added, to the total number of elements changed.
     */
    changed?: boolean;
}
/**
 * @internal
 * Convert input from `Record` to `SortedSetDataType` to ensure the only one type.
 */
export declare function convertElementsAndScores(membersAndScores: SortedSetDataType | Record<string, number>): SortedSetDataType;
/**
 * @internal
 */
export declare function createZAdd(key: GlideString, membersAndScores: ElementAndScore[] | Record<string, Score>, options?: ZAddOptions, incr?: boolean): command_request.Command;
/**
 * `KeyWeight` - pair of variables represents a weighted key for the `ZINTERSTORE` and `ZUNIONSTORE` sorted sets commands.
 */
export type KeyWeight = [GlideString, number];
/**
 * `AggregationType` - representing aggregation types for `ZINTERSTORE` and `ZUNIONSTORE` sorted set commands.
 */
export type AggregationType = "SUM" | "MIN" | "MAX";
/**
 * @internal
 */
export declare function createZInterstore(destination: GlideString, keys: GlideString[] | KeyWeight[], aggregationType?: AggregationType): command_request.Command;
/**
 * @internal
 */
export declare function createZInter(keys: GlideString[] | KeyWeight[], aggregationType?: AggregationType, withScores?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createZUnion(keys: GlideString[] | KeyWeight[], aggregationType?: AggregationType, withScores?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createZRem(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createZCard(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createZInterCard(keys: GlideString[], limit?: number): command_request.Command;
/**
 * @internal
 */
export declare function createZDiff(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createZDiffWithScores(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createZDiffStore(destination: GlideString, keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createZScore(key: GlideString, member: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createZUnionStore(destination: GlideString, keys: GlideString[] | KeyWeight[], aggregationType?: AggregationType): command_request.Command;
/**
 * @internal
 */
export declare function createZMScore(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createScan(cursor: GlideString, options?: ScanOptions): command_request.Command;
export declare enum InfBoundary {
    /**
     * Positive infinity bound.
     */
    PositiveInfinity = "+",
    /**
     * Negative infinity bound.
     */
    NegativeInfinity = "-"
}
/**
 * Defines the boundaries of a range.
 */
export type Boundary<T> = 
/**
 *  Represents an lower/upper boundary.
 */
InfBoundary
/**
 *  Represents a specific boundary.
 */
 | {
    /**
     * The comparison value.
     */
    value: T;
    /**
     * Whether the value is inclusive. Defaults to `true`.
     */
    isInclusive?: boolean;
};
/**
 * Represents a range by index (rank) in a sorted set.
 * The `start` and `end` arguments represent zero-based indexes.
 */
export interface RangeByIndex {
    /**
     * The start index of the range.
     */
    start: number;
    /**
     * The end index of the range.
     */
    end: number;
}
/**
 * Represents a range by score or a range by lex in a sorted set.
 * The `start` and `end` arguments represent score boundaries.
 */
interface SortedSetRange<T> {
    /**
     * The start boundary.
     */
    start: Boundary<T>;
    /**
     * The end boundary.
     */
    end: Boundary<T>;
    /**
     * The limit argument for a range query.
     * Represents a limit argument for a range query in a sorted set to
     * be used in [ZRANGE](https://valkey.io/commands/zrange) command.
     *
     * The optional LIMIT argument can be used to obtain a sub-range from the
     * matching elements (similar to SELECT LIMIT offset, count in SQL).
     */
    limit?: {
        /**
         * The offset from the start of the range.
         */
        offset: number;
        /**
         * The number of elements to include in the range.
         * A negative count returns all elements from the offset.
         */
        count: number;
    };
}
export type RangeByScore = SortedSetRange<number> & {
    type: "byScore";
};
export type RangeByLex = SortedSetRange<GlideString> & {
    type: "byLex";
};
/**
 * @internal
 */
export declare function createZCount(key: GlideString, minScore: Boundary<number>, maxScore: Boundary<number>): command_request.Command;
/**
 * @internal
 */
export declare function createZRange(key: GlideString, rangeQuery: RangeByIndex | RangeByScore | RangeByLex, reverse?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createZRangeWithScores(key: GlideString, rangeQuery: RangeByIndex | RangeByScore | RangeByLex, reverse?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createZRangeStore(destination: GlideString, source: GlideString, rangeQuery: RangeByIndex | RangeByScore | RangeByLex, reverse?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createType(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createStrlen(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createLIndex(key: GlideString, index: number): command_request.Command;
/**
 * Defines where to insert new elements into a list.
 */
export declare enum InsertPosition {
    /**
     * Insert new element before the pivot.
     */
    Before = "before",
    /**
     * Insert new element after the pivot.
     */
    After = "after"
}
/**
 * @internal
 */
export declare function createLInsert(key: GlideString, position: InsertPosition, pivot: GlideString, element: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createZPopMin(key: GlideString, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createZPopMax(key: GlideString, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createEcho(message: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createPTTL(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createZRemRangeByRank(key: GlideString, start: number, end: number): command_request.Command;
/**
 * @internal
 */
export declare function createZRemRangeByLex(key: GlideString, minLex: Boundary<GlideString>, maxLex: Boundary<GlideString>): command_request.Command;
/**
 * @internal
 */
export declare function createZRemRangeByScore(key: GlideString, minScore: Boundary<number>, maxScore: Boundary<number>): command_request.Command;
/** @internal */
export declare function createPersist(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createZLexCount(key: GlideString, minLex: Boundary<GlideString>, maxLex: Boundary<GlideString>): command_request.Command;
/** @internal */
export declare function createZRank(key: GlideString, member: GlideString, withScores?: boolean): command_request.Command;
export type StreamTrimOptions = ({
    /**
     * Trim the stream according to entry ID.
     * Equivalent to `MINID` in the Valkey API.
     */
    method: "minid";
    threshold: GlideString;
} | {
    /**
     * Trim the stream according to length.
     * Equivalent to `MAXLEN` in the Valkey API.
     */
    method: "maxlen";
    threshold: number;
}) & {
    /**
     * If `true`, the stream will be trimmed exactly. Equivalent to `=` in the
     * Valkey API. Otherwise the stream will be trimmed in a near-exact manner,
     * which is more efficient, equivalent to `~` in the Valkey API.
     */
    exact: boolean;
    /**
     * If set, sets the maximal amount of entries that will be deleted.
     */
    limit?: number;
};
export interface StreamAddOptions {
    /**
     * If set, the new entry will be added with this ID.
     */
    id?: string;
    /**
     * If set to `false`, a new stream won't be created if no stream matches the
     * given key. Equivalent to `NOMKSTREAM` in the Valkey API.
     */
    makeStream?: boolean;
    /**
     * If set, the add operation will also trim the older entries in the stream.
     */
    trim?: StreamTrimOptions;
}
/**
 * @internal
 */
export declare function createXAdd(key: GlideString, values: [GlideString, GlideString][], options?: StreamAddOptions): command_request.Command;
/**
 * @internal
 */
export declare function createXDel(key: GlideString, ids: string[]): command_request.Command;
/**
 * @internal
 */
export declare function createXTrim(key: GlideString, options: StreamTrimOptions): command_request.Command;
/**
 * @internal
 */
export declare function createXRange(key: GlideString, start: Boundary<string>, end: Boundary<string>, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createXRevRange(key: GlideString, start: Boundary<string>, end: Boundary<string>, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createXGroupCreateConsumer(key: GlideString, groupName: GlideString, consumerName: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createXGroupDelConsumer(key: GlideString, groupName: GlideString, consumerName: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createTime(): command_request.Command;
/**
 * @internal
 */
export declare function createPublish(message: GlideString, channel: GlideString, sharded?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createBRPop(keys: GlideString[], timeout: number): command_request.Command;
/**
 * @internal
 */
export declare function createBLPop(keys: GlideString[], timeout: number): command_request.Command;
/**
 * @internal
 */
export declare function createFCall(func: GlideString, keys: GlideString[], args: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createFCallReadOnly(func: GlideString, keys: GlideString[], args: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createFunctionDelete(libraryCode: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createFunctionFlush(mode?: FlushMode): command_request.Command;
/**
 * @internal
 */
export declare function createFunctionLoad(libraryCode: GlideString, replace?: boolean): command_request.Command;
/** Optional arguments for `FUNCTION LIST` command. */
export interface FunctionListOptions {
    /** A wildcard pattern for matching library names. */
    libNamePattern?: GlideString;
    /** Specifies whether to request the library code from the server or not. */
    withCode?: boolean;
}
/** Type of the response of `FUNCTION LIST` command. */
export type FunctionListResponse = Record<string, GlideString | Record<string, GlideString | null | GlideString[]>[]>[];
/**
 * @internal
 */
export declare function createFunctionList(options?: FunctionListOptions): command_request.Command;
/** Response for `FUNCTION STATS` command on a single node.
 *  The response is a map with 2 keys:
 *  1. Information about the current running function/script (or null if none).
 *  2. Details about the execution engines.
 */
export type FunctionStatsSingleResponse = Record<string, null | Record<string, GlideString | GlideString[] | number> | Record<string, Record<string, number>>>;
/** Full response for `FUNCTION STATS` command across multiple nodes.
 *  It maps node addresses to the per-node response.
 */
export type FunctionStatsFullResponse = Record<string, // Node address
FunctionStatsSingleResponse>;
/** @internal */
export declare function createFunctionStats(): command_request.Command;
/** @internal */
export declare function createFunctionKill(): command_request.Command;
/** @internal */
export declare function createFunctionDump(): command_request.Command;
/**
 * Option for `FUNCTION RESTORE` command: {@link GlideClient.functionRestore} and
 * {@link GlideClusterClient.functionRestore}.
 *
 * @see {@link https://valkey.io/commands/function-restore/"|valkey.io} for more details.
 */
export declare enum FunctionRestorePolicy {
    /**
     * Appends the restored libraries to the existing libraries and aborts on collision. This is the
     * default policy.
     */
    APPEND = "APPEND",
    /** Deletes all existing libraries before restoring the payload. */
    FLUSH = "FLUSH",
    /**
     * Appends the restored libraries to the existing libraries, replacing any existing ones in case
     * of name collisions. Note that this policy doesn't prevent function name collisions, only
     * libraries.
     */
    REPLACE = "REPLACE"
}
/** @internal */
export declare function createFunctionRestore(data: Buffer, policy?: FunctionRestorePolicy): command_request.Command;
/**
 * Represents offsets specifying a string interval to analyze in the {@link BaseClient.bitcount | bitcount} and {@link BaseClient.bitpos | bitpos} commands.
 * The offsets are zero-based indexes, with `0` being the first index of the string, `1` being the next index and so on.
 * The offsets can also be negative numbers indicating offsets starting at the end of the string, with `-1` being
 * the last index of the string, `-2` being the penultimate, and so on.
 *
 * If you are using Valkey 7.0.0 or above, the optional `indexType` can also be provided to specify whether the
 * `start` and `end` offsets specify `BIT` or `BYTE` offsets. If `indexType` is not provided, `BYTE` offsets
 * are assumed. If `BIT` is specified, `start=0` and `end=2` means to look at the first three bits. If `BYTE` is
 * specified, `start=0` and `end=2` means to look at the first three bytes.
 *
 * @see {@link https://valkey.io/commands/bitcount/ | bitcount} and {@link https://valkey.io/commands/bitpos/ | bitpos} for more details.
 */
export interface BitOffsetOptions {
    /** The starting offset index. */
    start: number;
    /**
     * The ending offset index. Optional since Valkey version 8.0 and above for the BITCOUNT command.
     * If not provided, it will default to the end of the string.
     * Could be defined only if `start` is defined.
     */
    end?: number;
    /**
     * The index offset type. This option can only be specified if you are using server version 7.0.0 or above.
     * Could be either {@link BitmapIndexType.BYTE} or {@link BitmapIndexType.BIT}.
     * If no index type is provided, the indexes will be assumed to be byte indexes.
     */
    indexType?: BitmapIndexType;
}
/**
 * @internal
 */
export declare function createBitCount(key: GlideString, options?: BitOffsetOptions): command_request.Command;
/**
 * Enumeration specifying if index arguments are BYTE indexes or BIT indexes.
 * Can be specified in {@link BitOffsetOptions}, which is an optional argument to the {@link BaseClient.bitcount|bitcount} command.
 * Can also be specified as an optional argument to the {@link BaseClient.bitposInverval|bitposInterval} command.
 *
 * since - Valkey version 7.0.0.
 */
export declare enum BitmapIndexType {
    /** Specifies that provided indexes are byte indexes. */
    BYTE = "BYTE",
    /** Specifies that provided indexes are bit indexes. */
    BIT = "BIT"
}
/**
 * @internal
 */
export declare function createBitPos(key: GlideString, bit: number, options?: BitOffsetOptions): command_request.Command;
/**
 * Defines flushing mode for {@link GlideClient.flushall}, {@link GlideClusterClient.flushall},
 *      {@link GlideClient.functionFlush}, {@link GlideClusterClient.functionFlush},
 *      {@link GlideClient.flushdb} and {@link GlideClusterClient.flushdb} commands.
 *
 * See https://valkey.io/commands/flushall/ and https://valkey.io/commands/flushdb/ for details.
 */
export declare enum FlushMode {
    /**
     * Flushes synchronously.
     *
     * since Valkey version 6.2.0.
     */
    SYNC = "SYNC",
    /** Flushes asynchronously. */
    ASYNC = "ASYNC"
}
/**
 * @internal
 * This function converts an input from Record or GlideRecord types to GlideRecord.
 *
 * @param record - input record in either Record or GlideRecord types.
 * @returns same data in GlideRecord type.
 */
export declare function convertKeysAndEntries(record: Record<string, string> | GlideRecord<string>): GlideRecord<string>;
/** Optional arguments for {@link BaseClient.xread|xread} command. */
export interface StreamReadOptions {
    /**
     * If set, the read request will block for the set amount of milliseconds or
     * until the server has the required number of entries. A value of `0` will block indefinitely.
     * Equivalent to `BLOCK` in the Valkey API.
     */
    block?: number;
    /**
     * The maximal number of elements requested.
     * Equivalent to `COUNT` in the Valkey API.
     */
    count?: number;
}
/** Optional arguments for {@link BaseClient.xreadgroup|xreadgroup} command. */
export type StreamReadGroupOptions = StreamReadOptions & {
    /**
     * If set, messages are not added to the Pending Entries List (PEL). This is equivalent to
     * acknowledging the message when it is read.
     */
    noAck?: boolean;
};
/**
 * @internal
 */
export declare function createXRead(keys_and_ids: GlideRecord<string>, options?: StreamReadOptions): command_request.Command;
/** @internal */
export declare function createXReadGroup(group: GlideString, consumer: GlideString, keys_and_ids: GlideRecord<string>, options?: StreamReadGroupOptions): command_request.Command;
/**
 * @internal
 */
export declare function createXInfoStream(key: GlideString, options: boolean | number): command_request.Command;
/** @internal */
export declare function createXInfoGroups(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createXLen(key: GlideString): command_request.Command;
/** Optional arguments for {@link BaseClient.xpendingWithOptions|xpending}. */
export interface StreamPendingOptions {
    /** Filter pending entries by their idle time - in milliseconds. Available since Valkey 6.2.0. */
    minIdleTime?: number;
    /** Starting stream ID bound for range. Exclusive range is available since Valkey 6.2.0. */
    start: Boundary<string>;
    /** Ending stream ID bound for range. Exclusive range is available since Valkey 6.2.0. */
    end: Boundary<string>;
    /** Limit the number of messages returned. */
    count: number;
    /** Filter pending entries by consumer. */
    consumer?: GlideString;
}
/** @internal */
export declare function createXPending(key: GlideString, group: GlideString, options?: StreamPendingOptions): command_request.Command;
/** @internal */
export declare function createXInfoConsumers(key: GlideString, group: GlideString): command_request.Command;
/** Optional parameters for {@link BaseClient.xclaim|xclaim} command. */
export interface StreamClaimOptions {
    /**
     * Set the idle time (last time it was delivered) of the message in milliseconds. If `idle`
     * is not specified, an `idle` of `0` is assumed, that is, the time count is reset
     * because the message now has a new owner trying to process it.
     */
    idle?: number;
    /**
     * This is the same as {@link idle} but instead of a relative amount of milliseconds, it sets the
     * idle time to a specific Unix time (in milliseconds). This is useful in order to rewrite the AOF
     * file generating `XCLAIM` commands.
     */
    idleUnixTime?: number;
    /**
     * Set the retry counter to the specified value. This counter is incremented every time a message
     * is delivered again. Normally {@link BaseClient.xclaim|xclaim} does not alter this counter,
     * which is just served to clients when the {@link BaseClient.xpending|xpending} command is called:
     * this way clients can detect anomalies, like messages that are never processed for some reason
     * after a big number of delivery attempts.
     */
    retryCount?: number;
    /**
     * Creates the pending message entry in the PEL even if certain specified IDs are not already in
     * the PEL assigned to a different client. However, the message must exist in the stream,
     * otherwise the IDs of non-existing messages are ignored.
     */
    isForce?: boolean;
}
/** @internal */
export declare function createXClaim(key: GlideString, group: GlideString, consumer: GlideString, minIdleTime: number, ids: string[], options?: StreamClaimOptions, justId?: boolean): command_request.Command;
/** @internal */
export declare function createXAutoClaim(key: GlideString, group: GlideString, consumer: GlideString, minIdleTime: number, start: GlideString, count?: number, justId?: boolean): command_request.Command;
/**
 * Optional arguments for {@link BaseClient.xgroupCreate|xgroupCreate}.
 *
 * See https://valkey.io/commands/xgroup-create/ for more details.
 */
export interface StreamGroupOptions {
    /**
     * If `true`and the stream doesn't exist, creates a new stream with a length of `0`.
     */
    mkStream?: boolean;
    /**
     * An arbitrary ID (that isn't the first ID, last ID, or the zero `"0-0"`. Use it to
     * find out how many entries are between the arbitrary ID (excluding it) and the stream's last
     * entry.
     *
     * since Valkey version 7.0.0.
     */
    entriesRead?: string;
}
/**
 * @internal
 */
export declare function createXGroupCreate(key: GlideString, groupName: GlideString, id: string, options?: StreamGroupOptions): command_request.Command;
/**
 * @internal
 */
export declare function createXGroupDestroy(key: GlideString, groupName: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createRename(key: GlideString, newKey: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createRenameNX(key: GlideString, newKey: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createPfAdd(key: GlideString, elements: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createPfCount(keys: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createPfMerge(destination: GlideString, sourceKey: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createObjectEncoding(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createObjectFreq(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createObjectIdletime(key: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createObjectRefcount(key: GlideString): command_request.Command;
/** Additional parameters for `LOLWUT` command. */
export interface LolwutOptions {
    /**
     * An optional argument that can be used to specify the version of computer art to generate.
     */
    version?: number;
    /**
     * An optional argument that can be used to specify the output:
     * - For version `5`, those are length of the line, number of squares per row, and number of squares per column.
     * - For version `6`, those are number of columns and number of lines.
     */
    parameters?: number[];
}
/**
 * @internal
 */
export declare function createLolwut(options?: LolwutOptions): command_request.Command;
/**
 * @internal
 */
export declare function createFlushAll(mode?: FlushMode): command_request.Command;
/**
 * @internal
 */
export declare function createFlushDB(mode?: FlushMode): command_request.Command;
/**
 * @internal
 */
export declare function createCopy(source: GlideString, destination: GlideString, options?: {
    destinationDB?: number;
    replace?: boolean;
}): command_request.Command;
/**
 * @internal
 */
export declare function createMove(key: GlideString, dbIndex: number): command_request.Command;
/**
 * @internal
 */
export declare function createDump(key: GlideString): command_request.Command;
/**
 * Optional arguments for `RESTORE` command.
 *
 * @See {@link https://valkey.io/commands/restore/|valkey.io} for details.
 * @remarks `IDLETIME` and `FREQ` modifiers cannot be set at the same time.
 */
export interface RestoreOptions {
    /**
     * Set to `true` to replace the key if it exists.
     */
    replace?: boolean;
    /**
     * Set to `true` to specify that `ttl` argument of {@link BaseClient.restore} represents
     * an absolute Unix timestamp (in milliseconds).
     */
    absttl?: boolean;
    /**
     * Set the `IDLETIME` option with object idletime to the given key.
     */
    idletime?: number;
    /**
     * Set the `FREQ` option with object frequency to the given key.
     */
    frequency?: number;
}
/**
 * @internal
 */
export declare function createRestore(key: GlideString, ttl: number, value: GlideString, options?: RestoreOptions): command_request.Command;
/**
 * Optional arguments to LPOS command.
 *
 * See https://valkey.io/commands/lpos/ for more details.
 */
export interface LPosOptions {
    /** The rank of the match to return. */
    rank?: number;
    /** The specific number of matching indices from a list. */
    count?: number;
    /** The maximum number of comparisons to make between the element and the items in the list. */
    maxLength?: number;
}
/**
 * @internal
 */
export declare function createLPos(key: GlideString, element: GlideString, options?: LPosOptions): command_request.Command;
/**
 * @internal
 */
export declare function createDBSize(): command_request.Command;
/**
 * An optional condition to the {@link BaseClient.geoadd | geoadd},
 * {@link BaseClient.zadd | zadd} and {@link BaseClient.set | set} commands.
 */
export declare enum ConditionalChange {
    /**
     * Only update elements that already exist. Don't add new elements. Equivalent to `XX` in the Valkey API.
     */
    ONLY_IF_EXISTS = "XX",
    /**
     * Only add new elements. Don't update already existing elements. Equivalent to `NX` in the Valkey API.
     */
    ONLY_IF_DOES_NOT_EXIST = "NX"
}
/**
 * Represents a geographic position defined by longitude and latitude.
 * The exact limits, as specified by `EPSG:900913 / EPSG:3785 / OSGEO:41001` are the
 * following:
 *
 *   Valid longitudes are from `-180` to `180` degrees.
 *   Valid latitudes are from `-85.05112878` to `85.05112878` degrees.
 */
export interface GeospatialData {
    /** The longitude coordinate. */
    longitude: number;
    /** The latitude coordinate. */
    latitude: number;
}
/**
 * Optional arguments for the GeoAdd command.
 *
 * See https://valkey.io/commands/geoadd/ for more details.
 */
export interface GeoAddOptions {
    /** Options for handling existing members. See {@link ConditionalChange}. */
    updateMode?: ConditionalChange;
    /** If `true`, returns the count of changed elements instead of new elements added. */
    changed?: boolean;
}
/**
 * @internal
 */
export declare function createGeoAdd(key: GlideString, membersToGeospatialData: Map<GlideString, GeospatialData>, options?: GeoAddOptions): command_request.Command;
/** Enumeration representing distance units options. */
export declare enum GeoUnit {
    /** Represents distance in meters. */
    METERS = "m",
    /** Represents distance in kilometers. */
    KILOMETERS = "km",
    /** Represents distance in miles. */
    MILES = "mi",
    /** Represents distance in feet. */
    FEET = "ft"
}
/**
 * @internal
 */
export declare function createGeoPos(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createGeoDist(key: GlideString, member1: GlideString, member2: GlideString, geoUnit?: GeoUnit): command_request.Command;
/**
 * @internal
 */
export declare function createGeoHash(key: GlideString, members: GlideString[]): command_request.Command;
/**
 * Optional parameters for {@link BaseClient.geosearch|geosearch} command which defines what should be included in the
 * search results and how results should be ordered and limited.
 */
export type GeoSearchResultOptions = GeoSearchCommonResultOptions & {
    /** Include the coordinate of the returned items. */
    withCoord?: boolean;
    /**
     * Include the distance of the returned items from the specified center point.
     * The distance is returned in the same unit as specified for the `searchBy` argument.
     */
    withDist?: boolean;
    /** Include the geohash of the returned items. */
    withHash?: boolean;
};
/**
 * Optional parameters for {@link BaseClient.geosearchstore|geosearchstore} command which defines what should be included in the
 * search results and how results should be ordered and limited.
 */
export type GeoSearchStoreResultOptions = GeoSearchCommonResultOptions & {
    /**
     * Determines what is stored as the sorted set score. Defaults to `false`.
     * - If set to `false`, the geohash of the location will be stored as the sorted set score.
     * - If set to `true`, the distance from the center of the shape (circle or box) will be stored as the sorted set score. The distance is represented as a floating-point number in the same unit specified for that shape.
     */
    storeDist?: boolean;
};
interface GeoSearchCommonResultOptions {
    /** Indicates the order the result should be sorted in. */
    sortOrder?: SortOrder;
    /** Indicates the number of matches the result should be limited to. */
    count?: number;
    /** Whether to allow returning as enough matches are found. This requires `count` parameter to be set. */
    isAny?: boolean;
}
/** Defines the sort order for nested results. */
export declare enum SortOrder {
    /** Sort by ascending order. */
    ASC = "ASC",
    /** Sort by descending order. */
    DESC = "DESC"
}
export type GeoSearchShape = GeoCircleShape | GeoBoxShape;
/** Circle search shape defined by the radius value and measurement unit. */
export interface GeoCircleShape {
    /** The radius to search by. */
    radius: number;
    /** The measurement unit of the radius. */
    unit: GeoUnit;
}
/** Rectangle search shape defined by the width and height and measurement unit. */
export interface GeoBoxShape {
    /** The width of the rectangle to search by. */
    width: number;
    /** The height of the rectangle to search by. */
    height: number;
    /** The measurement unit of the width and height. */
    unit: GeoUnit;
}
export type SearchOrigin = CoordOrigin | MemberOrigin;
/** The search origin represented by a {@link GeospatialData} position. */
export interface CoordOrigin {
    /** The pivot location to search from. */
    position: GeospatialData;
}
/** The search origin represented by an existing member. */
export interface MemberOrigin {
    /** Member (location) name stored in the sorted set to use as a search pivot. */
    member: GlideString;
}
/** @internal */
export declare function createGeoSearch(key: GlideString, searchFrom: SearchOrigin, searchBy: GeoSearchShape, resultOptions?: GeoSearchResultOptions): command_request.Command;
/** @internal */
export declare function createGeoSearchStore(destination: GlideString, source: GlideString, searchFrom: SearchOrigin, searchBy: GeoSearchShape, resultOptions?: GeoSearchStoreResultOptions): command_request.Command;
/**
 * @internal
 */
export declare function createZRevRank(key: GlideString, member: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createZRevRankWithScore(key: GlideString, member: GlideString): command_request.Command;
/**
 * Mandatory option for zmpop.
 * Defines which elements to pop from the sorted set.
 */
export declare enum ScoreFilter {
    /** Pop elements with the highest scores. */
    MAX = "MAX",
    /** Pop elements with the lowest scores. */
    MIN = "MIN"
}
/**
 * @internal
 */
export declare function createZMPop(keys: GlideString[], modifier: ScoreFilter, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createBZMPop(keys: GlideString[], modifier: ScoreFilter, timeout: number, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createZIncrBy(key: GlideString, increment: number, member: GlideString): command_request.Command;
/**
 * Optional arguments to {@link BaseClient.sort|sort}, {@link BaseClient.sortStore|sortStore} and {@link BaseClient.sortReadOnly|sortReadOnly} commands.
 *
 * See https://valkey.io/commands/sort/ for more details.
 *
 * @remarks When in cluster mode, {@link SortOptions.byPattern|byPattern} and {@link SortOptions.getPatterns|getPattern} must map to the same hash
 *     slot as the key, and this is supported only since Valkey version 8.0.
 */
export interface SortOptions {
    /**
     * A pattern to sort by external keys instead of by the elements stored at the key themselves. The
     * pattern should contain an asterisk (*) as a placeholder for the element values, where the value
     * from the key replaces the asterisk to create the key name. For example, if `key`
     * contains IDs of objects, `byPattern` can be used to sort these IDs based on an
     * attribute of the objects, like their weights or timestamps.
     * Supported in cluster mode since Valkey version 8.0 and above.
     */
    byPattern?: GlideString;
    /**
     * Limiting the range of the query by setting offset and result count. See {@link Limit} class for
     * more information.
     */
    limit?: Limit;
    /**
     * A pattern used to retrieve external keys' values, instead of the elements at `key`.
     * The pattern should contain an asterisk (`*`) as a placeholder for the element values, where the
     * value from `key` replaces the asterisk to create the `key` name. This
     * allows the sorted elements to be transformed based on the related keys values. For example, if
     * `key` contains IDs of users, `getPatterns` can be used to retrieve
     * specific attributes of these users, such as their names or email addresses. E.g., if
     * `getPatterns` is `name_*`, the command will return the values of the keys
     * `name_<element>` for each sorted element. Multiple `getPatterns`
     * arguments can be provided to retrieve multiple attributes. The special value `#` can
     * be used to include the actual element from `key` being sorted. If not provided, only
     * the sorted elements themselves are returned.
     * Supported in cluster mode since Valkey version 8.0 and above.
     */
    getPatterns?: GlideString[];
    /** Options for sorting order of elements. */
    orderBy?: SortOrder;
    /**
     * When `true`, sorts elements lexicographically. When `false` (default),
     * sorts elements numerically. Use this when the list, set, or sorted set contains string values
     * that cannot be converted into double precision floating point numbers.
     */
    isAlpha?: boolean;
}
/**
 * The `LIMIT` argument is commonly used to specify a subset of results from the
 * matching elements, similar to the `LIMIT` clause in SQL (e.g., `SELECT LIMIT offset, count`).
 */
export interface Limit {
    /** The starting position of the range, zero based. */
    offset: number;
    /** The maximum number of elements to include in the range. A negative count returns all elements from the offset. */
    count: number;
}
/** @internal */
export declare function createSort(key: GlideString, options?: SortOptions, destination?: GlideString): command_request.Command;
/** @internal */
export declare function createSortReadOnly(key: GlideString, options?: SortOptions): command_request.Command;
/**
 * @internal
 */
export declare function createHStrlen(key: GlideString, field: GlideString): command_request.Command;
/** @internal */
export declare function createHRandField(key: GlideString, count?: number, withValues?: boolean): command_request.Command;
/**
 * @internal
 */
export declare function createHScan(key: GlideString, cursor: string, options?: HScanOptions): command_request.Command;
/**
 * @internal
 */
export declare function createZRandMember(key: GlideString, count?: number, withscores?: boolean): command_request.Command;
/** @internal */
export declare function createLastSave(): command_request.Command;
/** @internal */
export declare function createLCS(key1: GlideString, key2: GlideString, options?: {
    len?: boolean;
    idx?: {
        withMatchLen?: boolean;
        minMatchLen?: number;
    };
}): command_request.Command;
/**
 * @internal
 */
export declare function createTouch(keys: GlideString[]): command_request.Command;
/** @internal */
export declare function createRandomKey(): command_request.Command;
/** @internal */
export declare function createWatch(keys: GlideString[]): command_request.Command;
/** @internal */
export declare function createUnWatch(): command_request.Command;
/** @internal */
export declare function createWait(numreplicas: number, timeout: number): command_request.Command;
/**
 * This base class represents the common set of optional arguments for the SCAN family of commands.
 * Concrete implementations of this class are tied to specific SCAN commands (`SCAN`, `SSCAN`).
 */
export interface BaseScanOptions {
    /**
     * The match filter is applied to the result of the command and will only include
     * strings that match the pattern specified. If the sorted set is large enough for scan commands to return
     * only a subset of the sorted set then there could be a case where the result is empty although there are
     * items that match the pattern specified. This is due to the default `COUNT` being `10` which indicates
     * that it will only fetch and match `10` items from the list.
     */
    match?: GlideString;
    /**
     * `COUNT` is a just a hint for the command for how many elements to fetch from the
     * sorted set. `COUNT` could be ignored until the sorted set is large enough for the `SCAN` commands to
     * represent the results as compact single-allocation packed encoding.
     */
    readonly count?: number;
}
/**
 * Options for the SCAN command.
 * `match`: The match filter is applied to the result of the command and will only include keys that match the pattern specified.
 * `count`: `COUNT` is a just a hint for the command for how many elements to fetch from the server, the default is 10.
 * `type`: The type of the object to scan.
 *  Types are the data types of Valkey: `string`, `list`, `set`, `zset`, `hash`, `stream`.
 */
export interface ScanOptions extends BaseScanOptions {
    type?: ObjectType;
}
/**
 * Options for the SCAN command.
 * `match`: The match filter is applied to the result of the command and will only include keys that match the pattern specified.
 * `count`: `COUNT` is a just a hint for the command for how many elements to fetch from the server, the default is 10.
 * `type`: The type of the object to scan.
 * Types are the data types of Valkey: `string`, `list`, `set`, `zset`, `hash`, `stream`.
 * `allowNonCoveredSlots`: If true, the scan will keep scanning even if slots are not covered by the cluster.
 * By default, the scan will stop if slots are not covered by the cluster.
 */
export interface ClusterScanOptions extends ScanOptions {
    allowNonCoveredSlots?: boolean;
}
/**
 * Options specific to the ZSCAN command, extending from the base scan options.
 */
export type ZScanOptions = BaseScanOptions & {
    /**
     * If true, the scores are not included in the results.
     * Supported from Valkey 8.0.0 and above.
     */
    readonly noScores?: boolean;
};
/**
 * Options specific to the HSCAN command, extending from the base scan options.
 */
export type HScanOptions = BaseScanOptions & {
    /**
     * If true, the values of the fields are not included in the results.
     * Supported from Valkey 8.0.0 and above.
     */
    readonly noValues?: boolean;
};
/**
 * @internal
 */
export declare function createZScan(key: GlideString, cursor: string, options?: ZScanOptions): command_request.Command;
/** @internal */
export declare function createSetRange(key: GlideString, offset: number, value: GlideString): command_request.Command;
/** @internal */
export declare function createAppend(key: GlideString, value: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createLMPop(keys: GlideString[], direction: ListDirection, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createBLMPop(keys: GlideString[], direction: ListDirection, timeout: number, count?: number): command_request.Command;
/**
 * @internal
 */
export declare function createPubSubChannels(pattern?: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createPubSubNumPat(): command_request.Command;
/**
 * @internal
 */
export declare function createPubSubNumSub(channels?: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createPubsubShardChannels(pattern?: GlideString): command_request.Command;
/**
 * @internal
 */
export declare function createPubSubShardNumSub(channels?: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createBZPopMax(keys: GlideString[], timeout: number): command_request.Command;
/**
 * @internal
 */
export declare function createBZPopMin(keys: GlideString[], timeout: number): command_request.Command;
/**
 * @internal
 */
export declare function createScriptShow(sha1: GlideString): command_request.Command;
/**
 * Time unit representation which is used in optional arguments for {@link BaseClient.getex|getex} and {@link BaseClient.set|set} command.
 */
export declare enum TimeUnit {
    /**
     * Set the specified expire time, in seconds. Equivalent to
     * `EX` in the VALKEY API.
     */
    Seconds = "EX",
    /**
     * Set the specified expire time, in milliseconds. Equivalent
     * to `PX` in the VALKEY API.
     */
    Milliseconds = "PX",
    /**
     * Set the specified Unix time at which the key will expire,
     * in seconds. Equivalent to `EXAT` in the VALKEY API.
     */
    UnixSeconds = "EXAT",
    /**
     * Set the specified Unix time at which the key will expire,
     * in milliseconds. Equivalent to `PXAT` in the VALKEY API.
     */
    UnixMilliseconds = "PXAT"
}
/**
 * @internal
 */
export declare function createGetEx(key: GlideString, options?: "persist" | {
    type: TimeUnit;
    duration: number;
}): command_request.Command;
/**
 * @internal
 */
export declare function createXAck(key: GlideString, group: GlideString, ids: string[]): command_request.Command;
/**
 * @internal
 */
export declare function createXGroupSetid(key: GlideString, groupName: GlideString, id: string, entriesRead?: number): command_request.Command;
/**
 * @internal
 */
export declare function createScriptExists(sha1s: GlideString[]): command_request.Command;
/**
 * @internal
 */
export declare function createScriptFlush(mode?: FlushMode): command_request.Command;
/** @internal */
export declare function createScriptKill(): command_request.Command;
export {};

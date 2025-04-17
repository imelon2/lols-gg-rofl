import { Buffer } from "buffer";
import { Metadata,ROFLReader } from "rofl-parser.js";

export const readerByBuffer = (buffer:Buffer) : Metadata=> {
    const reader = new ROFLReader(buffer)
    return reader.getMetadata();
}
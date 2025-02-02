// TODO - TSDoc comments

/**
 * A generic API that provides an abstraction for reading from buffers.
 * 
 * @example Basic usage
 * 
 * ```
 * console.log(buffer); // <Buffer 14 a0 0f>
 * 
 * const readStream = new StreamIn(buffer);
 * 
 * console.log(readStream.readUint8()); // 20 (0x14)
 * console.log(readStream.readUint16LE()); // 4000 (0x0f_a0)
 * ```
 */
export default class StreamIn {
	private buffer: Buffer;

	/**
	 * "Seek pointer". Must satisfy `0 <= this.pos <= this.size() - 1`.
	 * 
	 * @see {@link skip()}
	 * @see {@link seek()}
	 */
	public pos: number;

	/**
	 * @param buffer Internal buffer.
	 */
	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.pos = 0;
	}

	/**
	 * @returns `true` if the internal buffer contains data.
	 */
	public hasData(): boolean {
		return this.pos < this.buffer.length;
	}

	/**
	 * @returns Size of internal buffer in bytes.
	 */
	public size(): number {
		return this.buffer.length;
	}

	/**
	 * Moves the seek pointer by an amount.
	 * 
	 * @param length Number of bytes to skip.
	 */
	public skip(length: number): void {
		this.pos += length;
	}

	/**
	 * Sets the seek pointer to a specific byte.
	 * 
	 * @param pos Byte offset to set to.
	 */
	public seek(pos: number): void {
		this.pos = pos;
	}

	/**
	 * Reads `length` bytes at the seek pointer,
	 * and moves the seek pointer foward that many bytes.
	 * 
	 * @param length Amount of bytes to read.
	 * @returns A sub-buffer of the requested bytes.
	 */
	public readBytes(length: number): Buffer {
		const read = this.buffer.subarray(this.pos, this.pos+length);
		this.pos += length;

		return read;
	}

	/**
	 * Reads an unsigned 8bit (1 byte) integer.
	 * 
	 * @see {@link readBytes()}
	 * 
	 * @returns The requested number.
	 */
	public readUint8(): number {
		return this.readBytes(1).readUint8();
	}

	/**
	 * Reads an unsigned little-endian 16bit (2 byte) integer.
	 * 
	 * @see {@link readBytes()}
	 * 
	 * @returns The requested number.
	 */
	public readUint16LE(): number {
		return this.readBytes(2).readUint16LE();
	}

	/**
	 * Reads an unsigned little-endian 32bit (4 byte) integer.
	 * 
	 * @see {@link readBytes()}
	 * 
	 * @returns The requested number.
	 */
	public readUint32LE(): number {
		return this.readBytes(4).readUint32LE();
	}

	/**
	 * Reads a signed little-endian 32bit (4 byte) integer.
	 * 
	 * @see {@link readBytes()}
	 * 
	 * @returns The requested number.
	 */
	public readInt32LE(): number {
		return this.readBytes(4).readInt32LE();
	}

	/**
	 * Reads an unsigned big-endian 16bit (2 byte) integer.
	 * 
	 * @see {@link readBytes()}
	 * 
	 * @returns The requested number.
	 */
	public readUint16BE(): number {
		return this.readBytes(2).readUint16BE();
	}

	/**
	 * Reads an unsigned big-endian 32bit (4 byte) integer.
	 * 
	 * @see {@link readBytes()}
	 * 
	 * @returns The requested number.
	 */
	public readUint32BE(): number {
		return this.readBytes(4).readUint32BE();
	}
}
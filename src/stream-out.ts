// TODO - TSDoc comments

/**
 * A generic API that provides an abstraction for writing to buffers.
 * 
 * @example Basic usage
 * 
 * ```
 * const writeStream = new StreamOut();
 * 
 * writeStream.writeUint8(0x14);
 * writeStream.writeUint16LE(0x0f_a0);
 * 
 * console.log(writeStream.bytes()); // <Buffer 14 a0 0f>
 * ```
 * 
 */
export default class StreamOut {
	private buffer: Buffer;

	/**
	 * "Seek pointer". Must satisfy `0 <= this.pos <= this.size() - 1`.
	 * 
	 * @see {@link skip()}
	 * @see {@link seek()}
	 */
	public pos: number;

	constructor() {
		this.buffer = Buffer.alloc(0);
		this.pos = 0;
	}

	/**
	 * @returns Internal buffer.
	 */
	public bytes(): Buffer {
		return this.buffer;
	}

	/**
	 * @returns Size of internal buffer in bytes.
	 */
	public size(): number {
		return this.buffer.length;
	}

	/**
	 * Moves the seek pointer forward, writing `length` amount of 0s in its path.
	 * 
	 * @param length Number of bytes to skip.
	 */
	public skip(length: number): void {
		this.writeBytes(Buffer.alloc(length));
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
	 * Writes the `bytes` Buffer at the seek pointer,
	 * and moves the seek pointer forward `bytes.length` many bytes.
	 * 
	 * @param bytes Data to write.
	 */
	public writeBytes(bytes: Buffer): void {
		const before = this.buffer.subarray(0, this.pos);
		const after = this.buffer.subarray(this.pos);

		this.buffer = Buffer.concat([
			before,
			bytes,
			after
		]);

		this.pos += bytes.length;
	}

	/**
	 * Writes an unsigned 8bit (1 byte) integer.
	 * 
	 * @param uint8 Number to write.
	 */
	public writeUint8(uint8: number): void {
		const bytes = Buffer.alloc(1);

		bytes.writeUint8(uint8);

		this.writeBytes(bytes);
	}

	/**
	 * Writes an unsigned little-endian 16bit (2 byte) integer.
	 * 
	 * @see {@link writeBytes()}
	 * 
	 * @param uint16 Number to write.
	 */
	public writeUint16LE(uint16: number): void {
		const bytes = Buffer.alloc(2);

		bytes.writeUint16LE(uint16);

		this.writeBytes(bytes);
	}

	/**
	 * Writes an unsigned little-endian 32bit (4 byte) integer.
	 * 
	 * @see {@link writeBytes()}
	 * 
	 * @param uint32 Number to write.
	 */
	public writeUint32LE(uint32: number): void {
		const bytes = Buffer.alloc(4);

		bytes.writeUint32LE(uint32);

		this.writeBytes(bytes);
	}

	/**
	 * Writes a signed little-endian 32bit (4 byte) integer.
	 * 
	 * @see {@link writeBytes()}
	 * 
	 * @param int132 Number to write.
	 */
	public writeInt32LE(int32: number): void {
		const bytes = Buffer.alloc(4);

		bytes.writeInt32LE(int32);

		this.writeBytes(bytes);
	}

	/**
	 * Writes an unsigned big-endian 16bit (2 byte) integer.
	 * 
	 * @see {@link writeBytes()}
	 * 
	 * @param uint16 Number to write.
	 */
	public writeUint16BE(uint16: number): void {
		const bytes = Buffer.alloc(2);

		bytes.writeUint16BE(uint16);

		this.writeBytes(bytes);
	}

	/**
	 * Writes an unsigned big-endian 32bit (4 byte) integer.
	 * 
	 * @see {@link writeBytes()}
	 * 
	 * @param uint32 Number to write.
	 */
	public writeUint32BE(uint32: number): void {
		const bytes = Buffer.alloc(4);

		bytes.writeUint32BE(uint32);

		this.writeBytes(bytes);
	}
}
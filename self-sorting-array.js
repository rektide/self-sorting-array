import binarySearch from "binary-search"

export const $comparator= Symbol.for( "self-sorting-array:comparator")

let _speciesHack= false

export class SelfSortingArray extends Array{
	static get [Symbol.species](){
		return SelfSortingArray
	}
	static make( comparator, ...items){
		let array= new SelfSortingArray()
		array[ $comparator]= comparator
		if( items.length){
			array.splice( 0, 0, ...items)
		}
	}
	static get [ Symbol.species](){
		return _speciesHack? Array: SelfSortingArray
	}

	constructor( comparator, ...items){
		super()
		this[ $comparator]= comparator
		if( items&& items.length){
			this.splice( 0, 0, ...items)
		}
	}

	splice( i, del, ...items){
		// remove deleted elements
		_speciesHack= true
		Array.prototype.splice.call( this, i, del)
		// insert new elements
		for( let item of items){
			let j= binarySearch( this, item, this[ $comparator])
			if( j< 0){
				j*= -1
				j-= 1
			}
			Array.prototype.splice.call( this, j, 0, item)
		}
		_speciesHack= false
		return this.length
	}
	pop(){
		return this.splice( this.length- 1, 1)[ 0]
	}
	push( ...items){
		this.splice( 0, 0, ...items) // splice will sort
		return this.length
	}
	shift(){
		return this.splice( 0, 1)[ 0]
	}
	unshift( ...items){
		this.splice( 0, 0, ...items) // splice will wort
		return this.length
	}
	
	fill( value, start= 0, end= this.length){
		// remove old
		const count= end- start
		this.splice( start, count)
		// find where to insert value
		const i= binarySearch( this, item, this[ $comparator])
		if( i< 0){
			i*= -1
			i-= 1
		}
		// create a batch "fill" object to insert
		const fillers= new Array( count)
		for( let j= 0; j< count; j++){
			fillers[ j]= value
		}
		// insert fill
		_speciesHack= true
		Array.prototype.splice.call( this, i, 0, fillers)
		_speciesHack= false
		return this
	}
	sort( comparator){
		if( !comparator|| comparator=== this[ $compare]){
			return this
		}
		this[ $comparator]= comparator
		return this.sort( comparator)
	}
	clone(){
		const copy= new this.constructor( this[ $comparator])
		for( var i in this){
			copy[ i]= this[ i]
		}
		return copy
	}
}
export default SelfSortingArray

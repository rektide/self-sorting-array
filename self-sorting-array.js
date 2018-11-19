import binarySearch from "binary-search"

export const $comparator= Symbol.for( "self-sorting-array:comparator")

export class SelfSortingArray extends Array{
	static get [Symbol.species](){
		return SelfSortingArray
	}
	constructor( comparator, ...items){
		super()
		this[ $comparator]= comparator
		if( items&& items.length){
			this.splice( 0, 0, ...items)
		}
	}
	splice( i, del, ...items){
		console.log("a")
		// remove deleted elements
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
		return this.length
	}
	push( ...items){
		this.splice( this.length- 1, 0, ...items)
		return this.length
	}
	unshift( ...items){
		this.splice( 0, 0, ...items)
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
		Array.prototype.splice.call( this, i, 0, fillers)
		return this
	}
	sort( compareFunction){
		if( !compareFunction|| compareFunction=== this[ $compare]){
			return this
		}
		return this.sort( compareFunction)
	}
}
export default SelfSortingArray

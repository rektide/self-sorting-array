import SelfSortingArray from ".."
import tape from "tape"

function basic( a, b){
	return a- b
}

tape( "self-sorting-array can sort numbers", function( t){
	const ssa= new SelfSortingArray( basic)
	ssa.push( 50, 10, 0, 30, 60, 40, 20)
	t.equal( ssa.length, 7)
	t.equal( ssa[ 0], 0)
	t.equal( ssa[ 1], 10)
	t.equal( ssa[ 2], 20)
	t.equal( ssa[ 3], 30)
	t.equal( ssa[ 4], 40)
	t.equal( ssa[ 5], 50)
	t.equal( ssa[ 6], 60)
	t.end()
})

tape( "self-sorting-array can do a variety of changes", function( t){
	const ssa= new SelfSortingArray( basic, 60, 40)
	t.equal( ssa[ 0], 40, "constructor")
	t.equal( ssa[ 1], 60)

	const shift= ssa.shift()
	t.equal( ssa.length, 1, "shift")
	t.equal( shift, 40)
	t.equal( ssa[ 0], 60)

	const unshift= ssa.unshift( 70, 50)
	t.equal( ssa.length, 3, "unshift")
	t.equal( unshift, 3)
	t.equal( ssa[ 0], 50)
	t.equal( ssa[ 1], 60)
	t.equal( ssa[ 2], 70)

	const push= ssa.push( 40)
	t.equal( ssa.length, 4, "push")
	t.equal( push, 4)
	t.equal( ssa[ 0], 40)
	t.equal( ssa[ 1], 50) //&c

	const pop= ssa.pop()
	t.equal( ssa.length, 3, "pop")
	t.equal( pop, 3)
	t.equal( ssa[ 0], 40)
	t.equal( ssa[ 1], 50)
	t.equal( ssa[ 2], 60)
	t.end()
})

tape( "self-sorting-array can clone", function( t){
	const
	  ssa1= new SelfSortingArray( basic, 50, 40, 60),
	  ssa2= ssa1.clone()
	t.equal( ssa2.length, 3)
	t.equal( ssa2[ 0], 40)
	t.equal( ssa2[ 1], 50)
	t.equal( ssa2[ 2], 60)

	ssa2.push( 30)
	t.equal( ssa2.length, 4)
	t.equal( ssa2[ 0], 30)
	t.equal( ssa2[ 1], 40)
	t.end()
})

tape( "self-sort-array can splice", function( t){
	const
	  ssa= new SelfSortingArray( basic, 30, 10, 20, 40),
	  removed= ssa.splice( 1, 2, 15)
	t.equal( ssa.length, 3)
	t.equal( ssa[ 1], 15)
	t.equal( ssa[ 2], 40)
	t.equal( removed[ 0], 20, "removed")
	t.equal( removed[ 1], 30)
	t.end()
})

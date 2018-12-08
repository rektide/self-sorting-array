import SelfSortingArray from ".."
import tape from "tape"

function basic( a, b){
	return a- b
}

tape( "self-sorting-array can sort numbers", function( t){
	const ssa= new SelfSortingArray( basic)
	ssa.push( 50, 10, 0, 30, 60, 40, 20)
	t.equal( ssa.length, 7, "element count")
	t.equal( ssa[ 0], 0, "correct element")
	t.equal( ssa[ 1], 10, "correct element")
	t.equal( ssa[ 2], 20, "correct element")
	t.equal( ssa[ 3], 30, "correct element")
	t.equal( ssa[ 4], 40, "correct element")
	t.equal( ssa[ 5], 50, "correct element")
	t.equal( ssa[ 6], 60, "correct element")
	t.end()
})

tape( "self-sorting-array can do a variety of changes", function( t){
	const ssa= new SelfSortingArray( basic, 60, 40)
	t.equal( ssa[ 0], 40, "constructor")
	t.equal( ssa[ 1], 60)

	ssa.shift()
	t.equal( ssa.length, 1, "shift")
	t.equal( ssa[ 0], 60)

	ssa.unshift( 70, 50)
	t.equal( ssa.length, 3, "unshift")
	t.equal( ssa[ 0], 50)
	t.equal( ssa[ 1], 60)
	t.equal( ssa[ 2], 70)

	ssa.push( 40)
	t.equal( ssa.length, 4, "push")
	t.equal( ssa[ 0], 40)
	t.equal( ssa[ 1], 50) //&c

	ssa.pop()
	t.equal( ssa.length, 3, "pop")
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

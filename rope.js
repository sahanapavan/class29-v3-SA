class Rope
  {
    constructor(nlink, pointA)
    //pointA is where you want the rope to start from
    {
      this.nlink = nlink
 //nlinks - number of links

      this.pointA = pointA;

  const group = Body.nextGroup(true);
  //Returns the next unique group index for which the bodies will collide.
  //it its given true then its non-colliding

  //Matter.Composites.stack(xx, yy, columns, rows, columnGap, rowGap, callback) → Composite
  const rects = Composites.stack(100, 100, this.nlink, 1, 5,5, function(x, y) {
      return Bodies.rectangle(x, y, 30, 5, { collisionFilter: { group: group } });
  });
  /*collision between 2 bodies will obey the following rules
  the 2 bodies will have the same non-zero(positive) value of collisionFilter.group ,they will always collide
  the 2 bodies have different values(negative or zero) of collisionFilter.group,then one or both of the bodies*/
      
 //Matter.Composites.chain(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) → Composite
  this.body = Composites.chain(rects, 0.1, 0, -0.6, 0, {stiffness: 0.1, length: 0.1, render: {type: 'line'}});
      
  World.add(engine.world, this.body);

  //Matter.Composite.add(composite, object) → Composite
   //Matter.Constraint.create(options) → Constraint   
    Composite.add(rects, Constraint.create({
    pointA: this.pointA,
    bodyB: rects.bodies[0],
    pointB: {x: -25, y: 0},
    length:10,
    stiffness: 0.1
  }));
      
    }
    
    break()
    { //Matter.Composite.clear(this.rope,true);
      this.body = null;
    }
    
    show()
    {
      if(this.body!=null)
        {
          for (let i = 0; i < this.body.bodies.length-1; i++)
          {
              this.drawVertices(this.body.bodies[i].vertices);
             }
        }
    }
    
    // drawing vertices of the rope in that function
    drawVertices(vertices) 
    {
      // beginShape() begins recording vertices for a shape and endShape() stops recording. 
      beginShape();
      fill('#FFF717')
      noStroke();
      

      /*All shapes are constructed by connecting a series of vertices.
       vertex() is used to specify the vertex coordinates for points, lines, triangles, quads, and polygons. 
       It is used exclusively within the beginShape() and endShape() functions.*/
      for (let i = 0; i < vertices.length; i++) 
      {
       vertex(vertices[i].x, vertices[i].y);
       }
      endShape(CLOSE);
   }

  
  
    
  }
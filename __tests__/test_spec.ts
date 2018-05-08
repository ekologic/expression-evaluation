describe('Challenge', function () {
  it('should parse numbers', function () {
    expect(calculate('1 2 3') ===  3)
  })
  it('should parse floats', function() {
    expect(calculate('1 2 3.5') === 3.5)
  })
  it('should support addition', function() {
    expect(calculate('1 3 +') === 4)
  })
  it('should support multiplication', function() {
    expect(calculate('1 3 *') ===  3)
  })
  it('should support subtraction', function() {
    expect(calculate('1 3 -') === -2)
  })
  it('should support division', function() {
    expect(calculate('4 2 /') === 2)
  })

  it('should support evaluate this operation right', function() {
    expect(calculate('3 2 1 - *') === 3)
  })
  it('should support evaluate this operation right', function() {
    expect(calculate('7 4 5 + * 3 - 10 /') === 6)
  })
  it('should support evaluate this operation right', function() {
    expect(calculate('') === 0)
  })
})

const calculate = (str: string) => {
  const items = str.split(' ');
  if (items.length <= 3) {
    return items[items.length - 1];
  }
  
  const root:MyNode = buildNode(items.pop(),items);
  return calculate(root);
}
const operations = {
  '+' : (a:number,b:number) => a + b,
  '*' : (a:number,b:number) => a * b,
  '-' : (a:number,b:number) => a - b,
  '/' : (a:number,b:number) => a / b,
}

const buildNode = (operandOrNumber: any, array: string[]): MyNode => {
  if (Object.keys(operations).some(q=>q === operandOrNumber)) {
    return {
      value: operandOrNumber,
      right: buildNode(array.pop(),array),
      left: buildNode(array.pop(),array),
    }
  }
  return { value: operandOrNumber};
}

const calculate = (node:MyNode):number => {
  if (operations[node.value]) {
    return operations[node.value](node.left,node.right);
  }
  return node.value;
}


type MyNode = {
  left?: MyNode | number;
  right?: MyNode | number;
  value: any
}


describe('Challenge', function () {
  it('should parse numbers', function () {
    expect(calculate('1 2 3')).toBe(3)
  })
  it('should parse floats', function() {
    expect(calculate('1 2 3.5')).toBe(3.5)
  })
  it('should support addition', function() {
    expect(calculate('1 3 +')).toBe(4)
  })
  it('should support multiplication', function() {
    expect(calculate('1 3 *')).toBe(3)
  })
  it('should support subtraction', function() {
    expect(calculate('1 3 -')).toBe(-2)
  })
  it('should support division', function() {
    expect(calculate('4 2 /')).toBe(2)
  })

  it('should support evaluate this operation right', function() {
    expect(calculate('3 2 1 - *')).toBe(3)
  })
  it('should support evaluate this operation right', function() {
    expect(calculate('7 4 5 + * 3 - 10 /')).toBe(6)
  })
  it('should support evaluate this operation right', function() {
    expect(calculate('')).toBe(0)
  })
})

const calculate = (str: string) => {
  const items = str.split(' ');
  if(items.length === 1) {
    return 0;
  }
  if (items.length <= 2) {
    return items[items.length - 1];
  }
  
  const root:MyNode = buildNode(items.pop(),items);
  const result = Number(calculate1(root))
  return Number.isNaN(result) ? 0 : result;
}
const operations:any = {
  '+' : (a:number,b:number) => Number(a) + Number(b),
  '*' : (a:number,b:number) => Number(a) * Number(b),
  '-' : (a:number,b:number) => Number(a) - Number(b),
  '/' : (a:number,b:number) => Number(a) / Number(b),
}

const buildNode = (operandOrNumber: any, array: string[]): MyNode => {
  if (operandOrNumber in operations) {
    return {
      value: operandOrNumber,
      right: buildNode(array.pop(),array),
      left: buildNode(array.pop(),array),
    }
  }
  return { value: operandOrNumber};
}

const calculate1 = (node:MyNode):number => {
  if (node.value in operations) {
    return operations[node.value](calculate1(node.left as MyNode),calculate1(node.right as MyNode));
  }
  return node.value;
}


type MyNode = {
  left?: MyNode | number;
  right?: MyNode | number;
  value: any
}


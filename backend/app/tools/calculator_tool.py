import ast
import operator

class SafeCalculator:
    _operators = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.USub: operator.neg
    }

    def _eval(self, node):
        if isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.BinOp):
            return self._operators[type(node.op)](self._eval(node.left), self._eval(node.right))
        elif isinstance(node, ast.UnaryOp):
            return self._operators[type(node.op)](self._eval(node.operand))
        else:
            raise TypeError(node)

    def calculate(self, expression: str) -> str:
        try:
            # Clean expression
            expr = expression.replace(" ", "").replace("x", "*").replace("^", "**")
            parsed = ast.parse(expr, mode='eval')
            result = self._eval(parsed.body)
            return f"Calculation result: {result}"
        except Exception as e:
            return f"Error: Invalid mathematical expression '{expression}'. Details: {e}"

def calculate(expression: str) -> str:
    calc = SafeCalculator()
    return calc.calculate(expression)

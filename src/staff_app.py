from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow requests from any origin for now (can be restricted)

# Store orders in memory (for simplicity, use a database for production)
orders = []

@app.route('/submit-order', methods=['POST'])
def submit_order():
    order = request.json
    orders.append(order)
    return jsonify({'message': 'Order received successfully!'}), 200

@app.route('/get-orders', methods=['GET'])
def get_orders():
    return jsonify(orders), 200

@app.route('/delete-order/<int:index>', methods=['DELETE'])
def delete_order(index):
    if 0 <= index < len(orders):
        orders.pop(index)
        return jsonify({'message': 'Order deleted successfully!'}), 200
    else:
        return jsonify({'error': 'Order not found!'}), 404

@app.route('/delete-item/<int:order_index>/<int:item_index>', methods=['PATCH'])
def delete_item(order_index, item_index):
    if 0 <= order_index < len(orders):
        items = orders[order_index].get('items', [])
        if 0 <= item_index < len(items):
            del items[item_index]
            # Recalculate total
            orders[order_index]['total'] = round(sum(item['price'] for item in items), 2)
            return jsonify({'message': 'Item deleted successfully!'}), 200
        else:
            return jsonify({'error': 'Item index out of range!'}), 400
    return jsonify({'error': 'Order index out of range!'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

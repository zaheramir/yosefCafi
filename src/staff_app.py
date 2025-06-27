@app.route('/get-orders', methods=['GET'])
def get_orders():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, name, phone, table_number, item, total, status, created_at
            FROM orders
            WHERE status != 'completed'
            ORDER BY id ASC
        """)
        rows = cur.fetchall()
        orders = []
        for row in rows:
            try:
                items = json.loads(row[4]) if isinstance(row[4], str) else row[4]
            except Exception as parse_error:
                print(f"❌ JSON decode error for row {row[0]}:", parse_error)
                items = []
            orders.append({
                'id': row[0],
                'name': row[1],
                'phone': row[2],
                'table': row[3],
                'items': items,
                'total': float(row[5]),
                'status': row[6],
                'created_at': row[7].isoformat() if row[7] else None
            })
        cur.close()
        conn.close()
        return jsonify(orders), 200
    except Exception as e:
        import traceback
        print("❌ Error in /get-orders:", e)
        traceback.print_exc()  # <- this shows the full trace
        return jsonify({'error': 'Failed to retrieve orders'}), 500

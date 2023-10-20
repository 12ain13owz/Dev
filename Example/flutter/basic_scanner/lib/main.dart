import 'package:flutter/material.dart';
import 'package:qrscan/qrscan.dart' as scanner;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.purple,
      ),
      home: const MyHomePage(title: 'Flutter Scan barcode & qrcode'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String? result;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(8),
          child: SizedBox(
            height: 200,
            child: Card(
                child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "ผลการสแกน",
                    style: TextStyle(fontSize: 25),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  Text(
                    result ?? "ยังไม่มีข้อมูล",
                    style: const TextStyle(fontSize: 20),
                  ),
                ],
              ),
            )),
          )),
      floatingActionButton: FloatingActionButton(
        onPressed: () => {onScan()},
        child: const Icon(Icons.qr_code_scanner),
      ),
    );
  }

  onScan() async {
    var cameraScanResult = await scanner.scan();
    setState(() {
      print(1);
      print(cameraScanResult);
      result = cameraScanResult;
    });
  }
}

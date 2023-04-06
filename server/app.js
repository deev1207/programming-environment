const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const { exec, spawn } = require("child_process");
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let userInput;
let childProcess;

app.post('/compile', (req, res) => {
  let result;
  const lang = req.body.lang;
  if (lang == 'java') {
    const javac = spawn('javac', ['./assets/test.java']);
    javac.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    javac.on('close', (code) => {
      if (code == 0) {
        result = 0;
        res.json("compiled successfully");
      }
      else {
        result = 1;
        res.json("not compiled successfully");
      }
    });
  }
  else if (lang == 'cpp') {
    childProcess = spawn('g++', ['assets/test.cpp', '-o', 'test.exe']);
    childProcess.on('close', (code) => {
      if (code == 0) {
        console.error(`Compiled Successfully c`);
        return;
      }
      else {
        console.error(`Not Compiled Successfully`);
      }
    });
  }
})

app.post('/run', (req, res) => {
  userInput = req.body.userInput || null;
  const lang = req.body.lang;
  if (lang == 'java') {
    const java = spawn('java', ['-cp', 'assets', 'test']);
    java.stdin.write(`${userInput}\n`);
    java.stdout.on('data', (data) => {
      res.json(data.toString());
    });
    java.stderr.on('data', (data) => {
      res.json(`stderr: ${data}`);
    });
    java.on('close', (code) => {
      res.json(`java process exited with code ${code}`);
    });
  }
  else if (lang == 'cpp') {
    const codeExecution = spawn('test.exe');
    process.stdin.on('data', (data) => {
      console.log();
      codeExecution.stdin.write(data);
    });
    codeExecution.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    codeExecution.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  }
})

app.post('/rubric', async (req, res) => {
  const rubric_result = JSON.parse(fs.readFileSync('rubric.json', 'utf8'));;
  await main(rubric_result);
  fs.writeFileSync("rubric_results.json", JSON.stringify(rubric_result), "utf8")
  res.status(200).send("File successfully updated.");
});

async function main(rubric_result) {
  preparePayload(rubric_result);
  for (const test of rubric_result.criteria.blackboxtests) {
    const input = test.rule.input;
    const output = await run(input, 'test');
    if (output.message.trim() === test.rule.output) {
      test.result.PASS = true;
      test.score = rubric_result.weightage.blackboxtests / rubric_result.criteria.blackboxtests.length;
    } else {
      test.result.ERROR = true;
      test.result.violations.push(`expected:<${test.rule.output.trim()}> but was:<${output.message.trim()}>`);
      test.score = 0;
    }
    if (output.status === 'error') {
      test.result.ERROR = true;
      test.result.violations.push('runtime error');
    }
  }
  for (const test of rubric_result.criteria.evalblackboxtests) {
    const input = test.rule.input;
    const output = await run(input, 'test');
    if (output.message.trim() === test.rule.output) {
      console.log(test.result);
      test.result.PASS = true;
      test.score = rubric_result.weightage.blackboxtests / rubric_result.criteria.blackboxtests.length;
    } else {
      test.result.ERROR = true;
      test.result.violations.push(`expected:<${test.rule.output.trim()}> but was:<${output.message.trim()}>`);
      test.score = 0;
    }
    if (output.status === 'error') {
      test.result.violations.push('runtime error');
    }
  }
}

function run(input, fileName) {
  return new Promise((resolve) => {
    const java = spawn('java', ['-cp', 'assets', fileName]);
    java.stdin.write(`${input}\n`);
    let output = '';
    let error = '';
    java.stdout.on('data', (data) => {
      output += data.toString();
    });
    java.stderr.on('data', (data) => {
      error = error + data;
    });
    java.on('close', (code) => {
      if (code === 0) {
        resolve({
          status: 'success',
          message: output,
        });
      }
      resolve({
        status: 'error',
        message: error,
      });
    });
  });
}

function preparePayload(rubric_result) {
  rubric_result.criteria.blackboxtests.forEach((test) => {
    test.result = {
      PASS: false,
      ERROR: false,
      violations: [],
    };
  });
  rubric_result.criteria.evalblackboxtests.forEach((test) => {
    test.result = {
      "PASS": false,
      "ERROR": false,
      "violations": []
    }
  });
  const res_summary = {
    "totalchecks": 0,
    "pass": 0,
    "fail": 0,
    "error": 0,
    "skipped": 0,
    "groupScore": 0,
    "maxGroupScore": 0
  }
  rubric_result.resultSummary = {};
  rubric_result.resultSummary.system = res_summary;
  rubric_result.resultSummary.blackboxtests = res_summary;
  rubric_result.resultSummary.evalblackboxtests = res_summary;
}
app.listen(5000, () => {
  console.log('listening');
}
)
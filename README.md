# Convert HTML to Object

The `convert-html-to-object` CLI is a simple tool that allows you to convert HTML files into JavaScript objects and write them to a JSON file. This can be useful when you want to extract structured data from HTML documents and work with it programmatically.

## Installation

You can easily install the `convert-html-to-object` CLI using npm. Open your terminal and run the following command:

```shell
npm install -g convert-html-to-object
```

This will install the CLI globally on your system, allowing you to use it from anywhere.

## Usage

Once you have installed the CLI, you can use it to convert HTML files to JSON objects with the following command:

```shell
hto convert --src path/to/file.html
```

-   `convert`: This is the command to convert an HTML file to a JSON object.
-   `--src`: Use this option to specify the path to the HTML file you want to convert.

### Example

Let's say you have an HTML file named `example.html` located in the `/project` directory. To convert this file to a JSON object, you would run:

```shell
hto convert --src /project/example.html
```

This will generate a JSON file in the same directory as the HTML file with the `output.json` name. The JSON file will contain the structured data extracted from the HTML document.

---

Happy converting! If you have any questions or need assistance, feel free to reach out.

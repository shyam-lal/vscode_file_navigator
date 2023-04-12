const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {

	var arrowTap = false;
	var filesArray = [];
	var currentIndex = -1;
	if (vscode.window.activeTextEditor != null) {
		filesArray.push(vscode.window.activeTextEditor.document.fileName);
		currentIndex++;
	}
	

	vscode.window.onDidChangeActiveTextEditor((file) => {
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;

		// if (!filesArray.includes(currentlyOpenTabfilePath)) {
			if (!arrowTap) {
				if (currentIndex < (filesArray.length - 1)) {
					for (let index = filesArray.length -1; index >= 0 ; index--) {
						const element = filesArray[index];
						if (index > currentIndex) {
							filesArray.pop();
						}
					}
				}
				filesArray.push(currentlyOpenTabfilePath);
				currentIndex++;
			}
			arrowTap = false;
		// } else {
		// 	currentIndex = filesArray.indexOf(currentlyOpenTabfilePath);
		// }
	});


	let backFunction = vscode.commands.registerCommand('navigator.back', function () {
		arrowTap = true;
		if (currentIndex > 0) {
			currentIndex--;
			vscode.workspace.openTextDocument(filesArray[currentIndex]).then(doc => {
				vscode.window.showTextDocument(doc);
			});
		}

	});

	let forwardFunction = vscode.commands.registerCommand('navigator.forward', function () {
		arrowTap = true;
		if (currentIndex != filesArray.length-1) {
			currentIndex++;
			vscode.workspace.openTextDocument(filesArray[currentIndex]).then(doc => {
				vscode.window.showTextDocument(doc);
			});
		}
	});

	context.subscriptions.push(backFunction);
	context.subscriptions.push(forwardFunction);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
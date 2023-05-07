function compile() {
    const code = document.getElementById("code") as HTMLTextAreaElement;
    const result = document.getElementById("result") as HTMLTextAreaElement;

    result.value = "";
    //https://esolangs.org/wiki/Among_Us
    let acc1 = 0;
    let acc2 = 0;
    let stack = [];
    let output = "";
    //tokenize the input
    let tokens = code.value.split("\n");
    for (let i = 0; i < tokens.length; i++) {
        const line = tokens[i];
        //tokenize using spaces
        let words = line.split(" ");
        //make sure that the line ends in SUS or if it is WHERE? or WHO?
        if (words[words.length - 1] != "SUS" &&
            words[words.length - 1] != "WHERE?" &&
            words[words.length - 1] != "WHO?" &&
            words[words.length - 1] != "SUSSY" &&
            words[words.length - 1] != "VENTED" &&
            words[words.length - 1] != "ELECTRICAL") {
            result.value = "An error occurred while processing the compilation result:" +
                "\nIn process \"tokenize\":\n" +
                "Stack: " + stack + "\n" +
                "Line: " + line + "\n" +
                "Error: Missing token \'SUS\' at position " + (words.length - 1) + "\n";
            return;
        }

        //remove the SUS token
        words.pop();
        //process the line
        for (let j = 0; j < words.length; j++) {
            switch (words[j]) {
                case "RED":
                    acc1++;
                    break;
                case "BLUE":
                    stack.push(acc1);
                    break;
                case "GREEN":
                    output += String.fromCharCode(acc1);
                    break;
                case "YELLOW":
                    console.log("Skipping, not implemented yet");
                    break;
                case "PURPLE":
                    acc1 = stack.pop();
                    break;
                case "CYAN":
                    //max of acc1
                    const randomValue = Math.floor(Math.random() * acc1);
                    for (let k = 0; k < randomValue; k++) {
                        stack.pop();
                    }
                    break;
                case "BLACK":
                    if (stack.length == 0) {
                        result.value = "An error occurred while processing the compilation result:" +
                            "\nIn process \"tokenize\":\n" +
                            "Stack: " + stack + "\n" +
                            "Line: " + line + "\n" +
                            "Error: Stack underflow\n";
                        return;
                    }
                    //append the number at the top of the stack, but dont pop it
                    output += stack[stack.length - 1];
                    break;
                case "WHITE":
                    acc1--;
                    break;
                case "BROWN":
                    if (stack.length == 0) {
                        stack.push(acc1);
                        break;
                    }
                    stack[stack.length - 1] = acc1;
                    break;
                case "LIME":
                    if (stack.length == 0) {
                        stack.push(0);
                    }
                    stack[stack.length - 1] *= 2;
                    break;
                case "PINK":
                    acc1 = 0;
                    break;
                case "ORANGE":
                    acc1 += 10;
                    break;
                case "VENTED":
                    acc2 += 10;
                    break;
                case "SUSSY":
                    acc2--;
                    break;
                case "ELECTRICAL":
                    acc2=0;

            }
        }
    }
    result.value = output;
}
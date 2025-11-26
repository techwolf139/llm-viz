import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough08_Transformer(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Transformer) {
        return;
    }

    setInitialCamera(state, new Vec3(-135.531, 0.000, -353.905), new Vec3(291.100, 13.600, 5.706));

    let c0 = commentary(wt, null, 0)`

这就是一个完整的 transformer 块！

这些构成了任何 GPT 模型的主体，并重复多次，一个
块的输出馈送到下一个块，继续残差路径。

正如深度学习中常见的那样，很难确切地说这些层中的每一层在做什么，但我们
有一些一般的想法：早期层倾向于专注于学习
低级特征和模式，而后期层学习识别和理解
高级抽象和关系。在自然语言处理的背景下，
低层可能学习语法、句法和简单的词关联，而高层
可能捕获更复杂的语义关系、话语结构和上下文相关的含义。

`;

}

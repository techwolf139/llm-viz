import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough09_Output(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Output) {
        return;
    }

    setInitialCamera(state, new Vec3(-20.203, 0.000, -1642.819), new Vec3(281.600, -7.900, 2.298));

    let c0 = commentary(wt, null, 0)`

最后，我们来到模型的末端。最终 transformer 块的输出通过
层归一化，然后我们使用线性变换（矩阵乘法），这次没有偏置。

这个最终变换将我们的每个列向量从长度 C 变为长度 nvocab。因此，
它实际上为我们每一列的词汇表中的每个词生成一个分数。这些
分数有一个特殊的名字：logits。

"logits"这个名字来自"log-odds"，即每个 token 的几率的对数。使用"Log"
是因为我们接下来应用的 softmax 进行指数化以转换为"几率"或概率。

为了将这些分数转换为良好的概率，我们将它们通过 softmax 操作。现在，对于
每一列，我们有模型分配给词汇表中每个词的概率。

在这个特定的模型中，它有效地学习了如何对
三个字母进行排序的问题的所有答案，因此概率严重偏向正确答案。

当我们在时间上推进模型时，我们使用最后一列的概率来确定
要添加到序列中的下一个 token。例如，如果我们向模型提供了六个 token，我们将
使用第 6 列的输出概率。

此列的输出是一系列概率，我们实际上必须选择其中一个来用作
序列中的下一个。我们通过"从分布中采样"来做到这一点。也就是说，我们随机
选择一个 token，按其概率加权。例如，概率为 0.9 的 token 将在
90% 的时间内被选中。

然而，这里还有其他选项，例如始终选择概率最高的 token。

我们还可以通过使用温度参数来控制分布的"平滑度"。较高的
温度将使分布更均匀，较低的温度将使其更
集中在概率最高的 token 上。

我们通过在应用 softmax 之前将 logits（线性变换的输出）除以温度来做到这一点。
由于 softmax 中的指数化对较大的数字有很大影响，
使它们都更接近将减少这种影响。
`;

}

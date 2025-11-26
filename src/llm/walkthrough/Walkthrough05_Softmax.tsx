import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough05_Softmax(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Softmax) {
        return;
    }

    setInitialCamera(state, new Vec3(-24.350, 0.000, -1702.195), new Vec3(283.100, 0.600, 1.556));

    let c0 = commentary(wt, null, 0)`

softmax 操作用作自注意力的一部分，如上一节所示，它
也会出现在模型的最末端。

它的目标是获取一个向量并归一化其值，使它们的总和为 1.0。然而，这并不像
简单地除以总和那么简单。相反，每个输入值首先被指数化。

  a = exp(x_1)

这具有使所有值为正的效果。一旦我们有了指数化
值的向量，我们就可以将每个值除以所有值的总和。这将确保
值的总和为 1.0。由于所有指数化的值都是正的，我们知道结果
值将在 0.0 和 1.0 之间，这提供了原始值的概率分布。

这就是 softmax：简单地对值进行指数化，然后除以总和。

然而，有一个小的复杂性。如果任何输入值相当大，那么
指数化的值将非常大。我们最终会用一个大数除以一个非常大的数，
这可能会导致浮点运算的问题。

softmax 操作的一个有用属性是，如果我们向所有输入值添加一个常数，
结果将是相同的。因此，我们可以找到输入向量中的最大值并从
所有值中减去它。这确保最大值为 0.0，并且 softmax 保持数值
稳定。

让我们看看自注意力层上下文中的 softmax 操作。我们的输入
向量对于每个 softmax 操作是自注意力矩阵的一行（但仅到对角线）。

与层归一化一样，我们有一个中间步骤，在其中存储一些聚合值
以保持过程高效。

对于每一行，我们存储行中的最大值和移位和指数化值的总和。
然后，为了生成相应的输出行，我们可以执行一小组操作：减去
最大值，指数化，然后除以总和。

"softmax"这个名字是什么意思？这个操作的"硬"版本，称为 argmax，简单地找到
最大值，将其设置为 1.0，并将 0.0 分配给所有其他值。相比之下，softmax
操作充当其"更软"的版本。由于 softmax 中涉及的指数化，
最大值被强调并推向 1.0，同时仍保持概率分布
在所有输入值上。这允许更细致的表示，不仅捕获最
可能的选项，还捕获其他选项的相对可能性。
`;

}

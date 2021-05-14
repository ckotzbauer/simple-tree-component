
# Search Mode

If the search-feature is enabled, you can choose between two different search modes:

#### OnlyMatches (default)

The default behavior displays only `TreeNode`s which have a match with the given search-text. Only parent-nodes of matched
ones are displayed in addition to preserve the chain. Nodes of matching parents which itself do not have a text-match are hidden.


#### OnlyMatchesAndChilds

In some cases, it is good to see all child nodes if you search for a parent-node, even if the childs do not match directly.
This mode extends the default `OnlyMatches` in exactly this way.

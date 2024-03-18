export const KANBANABI = [
  {
    inputs: [{ internalType: 'address', name: '_sender', type: 'address' }],
    name: 'getMyHistorySubscribePremium',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          {
            internalType: 'address',
            name: 'userAddressWallet',
            type: 'address',
          },
        ],
        internalType: 'struct Kanban.user[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'subscribeRequestPremium',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

<template>
  <div class="app-container">

    <el-table ref="tableRef" :data="singleOrderData" border :span-method="arraySpanMethod" :header-cell-style="headerCellStyle" :cell-class-name="cellClassName" :cell-style="cellStyle" @selection-change="selectionChangeHandle">
      <el-table-column v-if="isShowCheckbox" type="selection" width="55" />
      <!-- productName use productPlaceholder field  -->
      <el-table-column label="Product" prop="productPlaceholder" width="150" />
      <el-table-column label="Product" prop="productName" align="center" width="600" />
      <el-table-column label="Quantity" prop="quantity" align="center" width="100" />
      <el-table-column label="Price" align="center" width="150">
        <template slot-scope="scope">
          <span>${{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Unit Discount" align="center" width="150">
        <template slot-scope="scope">
          <div v-if="!scope.row.isChildren">
            <p>-${{ scope.row.discount }}</p>
            <p v-if="scope.row.discountNotes">
              <el-tag size="small" type="primary">{{ scope.row.discountNotes }}</el-tag>
            </p>
          </div>
          <div v-else>
            <span>Combo Discount: -${{ scope.row.memberProductDiscount }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Total" align="center" width="150">
        <template slot-scope="scope">
          <span>${{ scope.row.subTotal }}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
// import { getDeptList } from '@/api/base/base'
// import { getDictLevel, getListData, getDataById, addData, deleteData, editData, exportById } from '@/api/tables/tables'

export default {
  components: {},
  data() {
    return {
      singleOrderData: [],
      isShowCheckbox: true,
      selectionList: [] // 勾选一行或多行数据
    }
  },
  created() {
    this.testData()
    this.singleOrderData = this.handleData(this.singleOrderData)
  },
  mounted() {
    if (this.isShowCheckbox && this.singleOrderData.length) {
      this.$refs.tableRef.toggleAllSelection()
      // this.$nextTick(() => {
      //   this.$refs.tableRef.toggleAllSelection()
      // })
    }
  },
  methods: {
    testData() {
      this.singleOrderData = [
        {
          productId: '1',
          productName: 'testCombo',
          discount: 0,
          quantity: 1,
          price: 200,
          subTotal: 200,
          discountNotes: 'Combo Discount',
          memberProductDiscount: 397,
          productMemberList: [
            {
              productId: '1-1',
              productName: 'testCombo - child1',
              quantity: 1,
              price: 499,
              subTotal: 200,
              discount: 331.83,
              discountNotes: 'Combo Discount'
            },
            {
              productId: '1-2',
              productName: 'testCombo - child2',
              quantity: 2,
              price: 49,
              subTotal: 400,
              discount: 32.58,
              discountNotes: 'Combo Discount'
            }
          ]
        },
        {
          productId: '2',
          productName: 'product',
          discount: 0,
          quantity: 1,
          price: 89,
          subTotal: 89,
          discountNotes: '',
          memberProductDiscount: 0,
          productMemberList: []
        }
      ]
    },
    handleData(singleOrderData) {
      var newArr = []
      for (let i = 0; i < singleOrderData.length; i++) {
        singleOrderData[i].productPlaceholder = singleOrderData[i].productName
        const product = singleOrderData[i]
        const newProduct = { ...singleOrderData[i] }
        delete newProduct.productMemberList
        newProduct.isNormalProduct = !product.productMemberList.length
        newArr.push(newProduct)
        if (product.productMemberList && product.productMemberList.length) {
          for (let j = 0; j < product.productMemberList.length; j++) {
            product.productMemberList[j].isStart = j === 0
            product.productMemberList[j].row = product.productMemberList.length
            product.productMemberList[j].isChildren = true
            product.productMemberList[j].productPlaceholder = 'Which includes:'
            product.productMemberList[j].memberProductDiscount = product.memberProductDiscount
            newArr.push(product.productMemberList[j])
          }
        }
      }
      return newArr
    },
    selectionChangeHandle(val) {
      this.selectionList = val
      console.log(JSON.stringify(this.selectionList))
    },
    // 设置表头样式 - 合并表头
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (row[0].level === 1) {
        // row[0].colSpan = 0
        row[1].colSpan = 2
        row[2].colSpan = 0
        const tempColumn = this.isShowCheckbox ? 2 : 0
        if (columnIndex === tempColumn) {
          return { display: 'none' }
        }
      }

      return { textAlign: 'center', background: '#E6E6E6' }
    },
    // 设置表内容样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: 'center' }
    },
    // 隐藏Checkbox
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.isNormalProduct || row.isChildren) {
          //
        } else {
          return 'disabled-column'
        }
      }
    },
    // 合并列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log('rowIndex=' + rowIndex + '-----' + 'columnIndex=' + columnIndex)
      // console.log('row')
      // console.log(JSON.stringify(row))
      // console.log('column')
      // console.log(JSON.stringify(column))

      // header

      // father
      if (column['property'] === 'productPlaceholder' && !row.isChildren) {
        return [1, 2]
      }
      if (column['property'] === 'productName' && !row.isChildren) {
        return [0, 0]
      }
      // children
      if (column['property'] === 'productPlaceholder' && row.isChildren && row.isStart) {
        return [row.row, 1]
      }
      if (column['property'] === 'productPlaceholder' && row.isChildren && !row.isStart) {
        return [0, 0]
      }

      // footer
      if (column['label'] === 'Unit Discount' && row.isChildren && row.isStart) {
        return [row.row, 2]
      }
      if (column['label'] === 'Unit Discount' && row.isChildren && !row.isStart) {
        return [0, 0]
      }
      if (column['label'] === 'Total' && row.isChildren && row.isStart) {
        return [0, 0]
      }
      if (column['label'] === 'Total' && row.isChildren && !row.isStart) {
        return [0, 0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .disabled-column .el-checkbox__input {
    display: none;
  }
}
</style>

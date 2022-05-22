import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LoadingView } from "./LoadingView";
import { ScrollEvent } from "recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import throttle from "lodash/throttle";
import { CustomItemAnimator } from "./CustomItemAnimator";
import {
  isLandscape,
  screenLongDimension,
  screenShortDimension,
} from "@/ultils/scale";
import { Colors } from "@/themes/Colors";

export const ViewTypes = {
  SECTION: "section",
  ITEM: "item",
};

// export const canChangeSize = Platform.OS === 'ios' && DeviceInfo.isTablet();
export const canChangeSize = true;

export const itemAnimator = new CustomItemAnimator();

export interface RecycleScrollEvent extends ScrollEvent {}

interface OwnProps {
  data: any[];
  itemHeight: number;
  rowRenderer: (
    type: string | number,
    data: any,
    index: number,
    extendedState?: object
  ) => JSX.Element | JSX.Element[] | null;
  renderHeader?: () => React.ReactElement;
  loading: boolean;
  isRefreshing: boolean;
  isLoadMore: boolean;
  noMore: boolean;
  error: boolean;
  onLoadData?: (isRefreshing: boolean, isLoadMore: boolean) => void;
  renderLoadingView?: Function;
  renderErrorView?: Function;
  renderEmptyView?: Function;
  renderFooter?: Function;
  renderRefreshControl?: Function;
  refreshable: boolean;
  loadMorable: boolean;
  onScroll?: (event: RecycleScrollEvent) => void;
  extendedState?: object;
  scrollProps?: Object;
  style?: ViewStyle;
  loadingViewStyle?: ViewStyle;
  emptyMessage?: string;
  externalScrollView?: any;
  forceNonDeterministicRendering?: boolean;
}

type Props = OwnProps;

type State = Readonly<{
  layoutProvider: LayoutProvider;
  dataProvider: DataProvider;
}>;

export class CommonRecycleList extends PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    refreshable: true,
    loadMorable: true,
    loading: false,
    isRefreshing: false,
    isLoadMore: false,
    noMore: false,
    error: false,
    forceNonDeterministicRendering: false,
  };

  _dataProvider: DataProvider;
  _portraitLayout: LayoutProvider;
  _landscapeLayout: LayoutProvider;

  constructor(props: Props) {
    super(props);
    this.onLayout = throttle(this.onLayout.bind(this), 500);
    this._dataProvider = new DataProvider(
      (r1, r2) => {
        return r1 !== r2;
      },
      (index: number) => {
        return this.props.data[index];
      }
    );

    this._portraitLayout = new LayoutProvider(
      () => {
        return ViewTypes.ITEM;
      },
      (type, dim) => {
        if (type === ViewTypes.ITEM) {
          dim.width = screenShortDimension;
          dim.height = props.itemHeight;
        } else {
          dim.width = 0;
          dim.height = 0;
        }
      }
    );

    this._landscapeLayout = new LayoutProvider(
      () => {
        return ViewTypes.ITEM;
      },
      (type, dim) => {
        if (type === ViewTypes.ITEM) {
          dim.width = screenLongDimension;
          dim.height = props.itemHeight;
        } else {
          dim.width = 0;
          dim.height = 0;
        }
      }
    );
    this.state = {
      dataProvider: this._dataProvider.cloneWithRows(this.props.data),
      layoutProvider: isLandscape()
        ? this._landscapeLayout
        : this._portraitLayout,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState((prevState) => {
        return {
          ...prevState,
          dataProvider: this.state.dataProvider.cloneWithRows(
            nextProps.data,
            undefined
          ),
        };
      });
    }
  }

  _onRefresh = () => {
    if (!this.props.refreshable) return;
    if (this.props.loading) return;
    if (!!this.props.onLoadData) {
      this.props.onLoadData(true, false);
    }
  };

  _onRetry = () => {
    if (this.props.loading) return;
    if (!!this.props.onLoadData) {
      this.props.onLoadData(false, false);
    }
  };

  _onEndReached = () => {
    if (this.props.error || this.props.noMore || this.props.loading) return;
    this._onLoadMore();
  };

  _onLoadMore = () => {
    if (!this.props.loadMorable) return;
    if (!!this.props.onLoadData) {
      this.props.onLoadData(false, true);
    }
  };

  renderRefreshControl = () => {
    if (!this.props.refreshable) return null;
    if (this.props.renderRefreshControl) {
      return this.props.renderRefreshControl();
    }
    return (
      <RefreshControl
        refreshing={this.props.isRefreshing}
        onRefresh={this._onRefresh}
      />
    );
  };

  renderLoadingView = () => {
    if (this.props.renderLoadingView) {
      return this.props.renderLoadingView();
    }
    return <LoadingView containerStyle={this.props.loadingViewStyle} />;
  };

  renderErrorView = () => {
    if (this.props.renderErrorView) {
      return this.props.renderErrorView();
    }
    return <View />;
  };

  renderEmptyView = () => {
    if (this.props.renderEmptyView) {
      return this.props.renderEmptyView();
    }
  };

  renderFooter = () => {
    if (this.props.renderFooter) {
      return this.props.renderFooter();
    }
    if (this.props.data.length === 0) return null;
    if (!this.props.loadMorable) return null;
    return <View style={styles.footerView}>{this.renderFooterContent()}</View>;
  };

  renderFooterContent = () => {
    if (this.props.error) {
      return (
        <TouchableOpacity style={styles.footerRetry} onPress={this._onLoadMore}>
          <Text style={styles.footerRetryText}>Thử lại</Text>
        </TouchableOpacity>
      );
    }
    if (this.props.noMore) {
      return <Text style={styles.noMoreCommentText}>Hết</Text>;
    }
    if (this.props.loading && this.props.isLoadMore) {
      return <ActivityIndicator color="#000" />;
    }
    return null;
  };

  onLayout() {
    const { width, height } = Dimensions.get("window");
    const isLandscape = width > height;
    const newLayoutProvider = isLandscape
      ? this._landscapeLayout
      : this._portraitLayout;
    if (newLayoutProvider !== this.state.layoutProvider) {
      this.setState((prevState: State) => {
        return {
          ...prevState,
          layoutProvider: newLayoutProvider,
        };
      });
    }
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {this.renderList()}
      </View>
    );
  }

  renderList = () => {
    if (this.props.data.length === 0) {
      if (this.props.error) {
        return this.renderErrorView();
      }
      return this.renderEmptyView();
    }

    return (
      <RecyclerListView
        style={this.props.style}
        onScroll={this.props.onScroll}
        layoutProvider={this.state.layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this.props.rowRenderer}
        renderFooter={this.renderFooter}
        scrollViewProps={{
          refreshControl: this.renderRefreshControl(),
          keyboardDismissMode: "on-drag",
          keyboardShouldPersistTaps: "handled",
          ...this.props.scrollProps,
        }}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.4}
        extendedState={this.props.extendedState}
        itemAnimator={itemAnimator}
        optimizeForInsertDeleteAnimations={true}
        forceNonDeterministicRendering={
          this.props.forceNonDeterministicRendering
        }
        canChangeSize={canChangeSize}
        externalScrollView={this.props.externalScrollView}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: 1,
    minWidth: 1,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  footerView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
  },
  noMoreCommentText: {
    fontSize: 12,
    color: Colors.grey4,
  },
  footerRetry: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerRetryText: {
    fontSize: 12,
    color: Colors.grey4,
  },
});
